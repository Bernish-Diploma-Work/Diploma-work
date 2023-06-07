import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../shared/database/entities/user.entity';
import { Repository } from 'typeorm';
import { SubscriptionEntity } from '../shared/database/entities/subscription.entity';
import { UserEditDto } from './dto/user-edit-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
  ) {}

  async subscribe(userId: number, userToSubId: number): Promise<boolean> {
    const userToSub = await this.userRepository.findOneBy({ id: userToSubId });
    if (!userToSub) {
      throw new NotFoundException();
    }

    const isSubscribed = await this.subscriptionRepository.findOneBy({
      fromUser: { id: userId },
      toUser: { id: userToSubId },
    });

    if (isSubscribed) {
      await this.subscriptionRepository.delete({
        id: isSubscribed.id,
      });
      userToSub.subscrubersCount--;
      await this.userRepository.save(userToSub);
      return false;
    }

    const newSub = this.subscriptionRepository.create({
      fromUser: { id: userId },
      toUser: { id: userToSubId },
    });
    await this.subscriptionRepository.save(newSub);
    userToSub.subscrubersCount++;
    await this.userRepository.save(userToSub);
    return true;
  }

  async getById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: [
        'videos',
        'subscribers',
        'subscriptions',
        'subscriptions.toUser',
        'likedVideos',
        'videos.user',
      ],
      order: {
        createdAt: 'DESC',
        videos: {
          createdAt: 'DESC',
        },
      },
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    return user;
  }

  async getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async update(dto: UserEditDto, id: number) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException();
    }
    return await this.userRepository.save({ ...user, ...dto });
  }
}
