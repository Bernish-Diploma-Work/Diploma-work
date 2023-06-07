import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { VideoEntity } from '../shared/database/entities/video.entity';
import { UserEntity } from '../shared/database/entities/user.entity';

@Module({
  providers: [
    VideoService,
    ...DatabaseModule.getProvidersForEntities([VideoEntity, UserEntity]),
  ],
  controllers: [VideoController],
  imports: [DatabaseModule],
})
export class VideoModule {}
