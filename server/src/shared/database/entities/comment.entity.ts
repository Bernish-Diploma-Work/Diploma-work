import { Base } from '../absctract/base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { VideoEntity } from './video.entity';

@Entity('Comment')
export class CommentEntity extends Base {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  author: UserEntity;

  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => VideoEntity, (video) => video.comments, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'video_id' })
  video: VideoEntity;
}
