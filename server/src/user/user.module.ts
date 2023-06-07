import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { UserEntity } from '../shared/database/entities/user.entity';
import { SubscriptionEntity } from '../shared/database/entities/subscription.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    UserService,
    ...DatabaseModule.getProvidersForEntities([UserEntity, SubscriptionEntity]),
  ],
  controllers: [UserController],
})
export class UserModule {}
