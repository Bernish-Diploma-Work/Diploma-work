import { Module, Provider } from '@nestjs/common';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConnectionManager } from './connection-manager';

const connectionProvider: Provider = {
  provide: ConnectionManager.getConnectionToken(),
  useFactory: async () => {
    try {
      const connection = await ConnectionManager.instance.getConnection();
      console.log('>> Connected to db');
      return connection;
    } catch (e) {
      console.log(e);
    }
  },
};

@Module({
  providers: [connectionProvider],
  exports: [connectionProvider],
})
export class DatabaseModule {
  public static getProvidersForEntities(params: any[]): Provider[] {
    return params.map((entity) => ({
      provide: getRepositoryToken(entity),
      useFactory: (connection: Connection) => {
        if (connection) {
          return connection.getRepository(entity);
        }
      },
      inject: [ConnectionManager.getConnectionToken()],
    }));
  }
}
