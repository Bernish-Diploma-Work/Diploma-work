import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../shared/database/entities/comment.entity';
import { CommentDto } from './dto/comment.dto';
import { VideoEntity } from '../shared/database/entities/video.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}

  async create(userId: number, dto: CommentDto): Promise<CommentEntity> {
    const video = await this.videoRepository.findOneBy({ id: dto.videoId });

    if (!video) {
      throw new NotFoundException();
    }

    const comment = await this.commentRepository.create({
      body: dto.body,
      video: { id: dto.videoId },
      author: { id: userId },
    });

    video.commentsCount++;
    await this.commentRepository.save(comment);
    await this.videoRepository.save(video);

    return comment;
  }
}
