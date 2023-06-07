import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Base } from '../absctract/base';
import { SubscriptionEntity } from './subscription.entity';
import { VideoEntity } from './video.entity';

@Entity('User')
export class UserEntity extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  @Index({ unique: true })
  sub: string;

  @Column({ default: '' })
  name: string;

  @Column({ default: false, name: 'is_verified' })
  isVerified: boolean;

  @Column({ default: 0, name: 'subscribers_count' })
  subscrubersCount: number;

  @Column({ default: '', type: 'text' })
  description: string;

  @Column({ default: '', name: 'avatar_path' })
  avatarPath: string;

  @Column({ default: '' })
  streamArn: string;

  @OneToMany(() => SubscriptionEntity, (sub) => sub.toUser)
  subscribers: SubscriptionEntity[];

  @OneToMany(() => SubscriptionEntity, (sub) => sub.fromUser)
  subscriptions: SubscriptionEntity[];

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @ManyToMany(() => VideoEntity, (video) => video.likedBy, { cascade: true })
  @JoinTable()
  likedVideos: VideoEntity[];
}
