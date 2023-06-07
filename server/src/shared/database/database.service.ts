import { DataSourceOptions } from 'typeorm';
import { configService } from '../config/config.service';
import { CommentEntity } from './entities/comment.entity';
import { SubscriptionEntity } from './entities/subscription.entity';
import { UserEntity } from './entities/user.entity';
import { VideoEntity } from './entities/video.entity';
import { InitEntities1685621821754 } from './migrations/1685621821754-InitEntities';
import { AddStreamArn1685740517022 } from './migrations/1685740517022-AddStreamArn';
import { AddStreamArnVideo1685741845985 } from './migrations/1685741845985-AddStreamArnVideo';
import { AddStreamKey1685742917872 } from './migrations/1685742917872-AddStreamKey';
import { AddStreamUrl1685809942703 } from './migrations/1685809942703-AddStreamUrl';
import { AddStreamIngest1685811509016 } from './migrations/1685811509016-AddStreamIngest';
import { AddUserSub1685845701282 } from './migrations/1685845701282-AddUserSub';
import { RemoveUserPassword1685846768151 } from './migrations/1685846768151-RemoveUserPassword';

class DatabaseService {
  entities: any[];
  migrations: Function[];

  constructor() {
    this.entities = [
      CommentEntity,
      SubscriptionEntity,
      UserEntity,
      VideoEntity,
    ];
    this.migrations = [
      InitEntities1685621821754,
      AddStreamArn1685740517022,
      AddStreamArnVideo1685741845985,
      AddStreamKey1685742917872,
      AddStreamUrl1685809942703,
      AddStreamIngest1685811509016,
      AddUserSub1685845701282,
      RemoveUserPassword1685846768151,
    ];
  }

  public get config(): DataSourceOptions {
    return {
      type: 'postgres',
      host: configService.DBHost,
      port: configService.DBPort,
      username: configService.DBUserName,
      password: configService.DBPassword,
      database: configService.DBName,
      entities: this.entities,
      migrations: this.migrations,
      migrationsRun: !configService.isProductionMode,
      logging: configService.TYPEORMLogging,
      synchronize: configService.TYPEORMSynchronize,
      maxQueryExecutionTime: configService.TYPEORMMaxQueryExecutionTime,
    };
  }
}

const databaseService = new DatabaseService();

export { databaseService };
