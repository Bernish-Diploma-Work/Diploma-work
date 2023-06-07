import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { CommentEntity } from '../shared/database/entities/comment.entity';
import { VideoEntity } from '../shared/database/entities/video.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    CommentService,
    ...DatabaseModule.getProvidersForEntities([CommentEntity, VideoEntity]),
  ],
  controllers: [CommentController],
})
export class CommentModule {}
