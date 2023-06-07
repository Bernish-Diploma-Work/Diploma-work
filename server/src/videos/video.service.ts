import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from '../shared/database/entities/video.entity';
import { FindOptionsWhereProperty, ILike, Repository } from 'typeorm';
import { VideoDto } from './dto/video.dto';
import { UserEntity } from '../shared/database/entities/user.entity';
import { ivsService } from '../shared/services/ivs/ivs.service';

const selectUserOptions = {
  id: true,
  name: true,
  avatarPath: true,
  subscrubersCount: true,
  isVerified: true,
  subscriptions: true,
};

const selectCommentOptions = {
  body: true,
  id: true,
  author: {
    ...selectUserOptions,
  },
};

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getById(id: number, isPublic = false) {
    const video = await this.videoRepository.findOne({
      where: isPublic
        ? {
            id,
            isPublic: true,
          }
        : { id },
      relations: ['user', 'comments', 'comments.author', 'likedBy'],

      select: {
        user: {
          ...selectUserOptions,
        },
        comments: {
          ...selectCommentOptions,
        },
      },
    });
    if (!video) {
      throw new NotFoundException('Video was not found!');
    }
    return video;
  }

  async updateVideo(id: number, dto: VideoDto) {
    const video = await this.videoRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!video) {
      throw new NotFoundException();
    }

    const user = video.user;

    const isStream = dto.isStream;

    video.name = dto.name;
    video.description = dto.description;
    video.thumbnailPath = dto.thumbnailPath;

    if (isStream) {
      const isActiveStream = await this.videoRepository.findOne({
        where: {
          isStream: true,
          isActiveStream: true,
          user,
        },
      });

      if (isActiveStream) {
        throw new BadRequestException();
      }

      await ivsService.deleteAllStreamKeys(user.streamArn);
      const stream = await ivsService.createStream(user.streamArn);
      const playbackUlr = await ivsService.getPlaybackUrl(user.streamArn);

      video.isActiveStream = true;
      video.isStream = true;
      video.streamKey = stream.value;
      video.streamArn = stream.arn;
      video.isProcessing = false;
      video.isPublic = true;
      video.streamUrl = playbackUlr;
      video.streamIngest = stream.ingest;
    } else {
      video.videoPath = dto.videoPath;
      video.duration = dto.duration;
      video.isProcessing = dto.isProcessing;
      video.isPublic = dto.isPublic;
    }
    return await this.videoRepository.save(video);
  }

  async getAll(searchTerm?: string) {
    return await this.videoRepository.find({
      where: {
        name: searchTerm ? ILike(`%${searchTerm}%`) : undefined,
        isPublic: true,
        isProcessing: false,
      },
      relations: ['comments', 'user'],
      order: {
        createdAt: 'DESC',
      },
      select: {
        user: {
          ...selectUserOptions,
        },
        comments: {
          ...selectCommentOptions,
        },
      },
    });
  }

  async getMostViewed() {
    const videos = await this.videoRepository.find({
      where: {
        isPublic: true,
        isProcessing: false,
      },
      relations: {
        user: true,
      },
      order: {
        views: 'desc',
      },
      select: {
        user: {
          ...selectUserOptions,
        },
      },
      take: 20,
    });

    return videos;
  }

  async create(userId: number): Promise<number> {
    const defaultFields = {
      videoPath: '',
      thumbnailPath: '',
      description: '',
      user: { id: userId },
      name: '',
      isProcessing: true,
    };
    const newVideo = this.videoRepository.create(defaultFields);
    const video = await this.videoRepository.save(newVideo);

    return video.id;
  }

  async delete(id: number) {
    try {
      return await this.videoRepository.delete({ id });
    } catch (error: any) {
      throw new InternalServerErrorException(error);
    }
  }

  async incrementViews(id: number) {
    const video = await this.getById(id);
    video.views++;
    return await this.videoRepository.save(video);
  }

  async updateReaction(id: number, userId: number) {
    const video = await this.getById(id);
    const isLiked = video.likedBy.some((user) => user.id === userId);
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!video) {
      throw new NotFoundException();
    }

    if (!user) {
      throw new NotFoundException();
    }
    if (isLiked) {
      video.likes--;
      video.likedBy = video.likedBy.filter((user) => user.id !== userId);
      return await this.videoRepository.save(video);
    }

    video.likes++;

    video.likedBy.push(user);
    return await this.videoRepository.save(video);
  }

  async stopStream(videoId: number) {
    const activeStream = await this.videoRepository.findOne({
      where: {
        isStream: true,
        isActiveStream: true,
        id: videoId,
      },
      relations: ['user'],
    });

    if (!activeStream) {
      throw new BadRequestException();
    }

    activeStream.isActiveStream = false;
    await this.videoRepository.save(activeStream);
    try {
      await ivsService.stopStream(activeStream.user.streamArn);
    } catch (e) {}

    await ivsService.deleteAllStreamKeys(activeStream.user.streamArn);
  }
}
