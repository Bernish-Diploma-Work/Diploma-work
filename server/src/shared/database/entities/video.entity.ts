import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Base } from '../absctract/base';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity('Video')
export class VideoEntity extends Base {
  @Column()
  name: string;

  @Column({ default: false, name: 'is_public' })
  isPublic: boolean;

  @Column({ default: 0 })
  duration: number;

  @Column({ default: 0, name: 'comments_count' })
  commentsCount: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: '', name: 'video_path' })
  videoPath: string;

  @Column({ default: false, name: 'is_processing' })
  isProcessing: boolean;

  @Column({ default: '', name: 'thumbnail_path' })
  thumbnailPath: string;

  @Column({ default: false, name: 'is_stream' })
  isStream: boolean;

  @Column({ default: false, name: 'is_active_stream' })
  isActiveStream: boolean;

  @Column({ name: 'stream_arn', nullable: true })
  streamArn: string | null;

  @Column({ name: 'stream_key', nullable: true })
  streamKey: string | null;

  @Column({ nullable: true, name: 'stream_ingest' })
  streamIngest: string | null;

  @Column({ nullable: true, name: 'stream_url' })
  streamUrl: string | null;

  @ManyToOne(() => UserEntity, (user) => user.videos, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.video, {
    cascade: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'comments' })
  comments: CommentEntity[];

  @ManyToMany(() => UserEntity, (user) => user.likedVideos, {
    onDelete: 'CASCADE',
  })
  likedBy: UserEntity[];
}
