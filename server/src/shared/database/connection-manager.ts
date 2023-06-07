import { Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import dataSource from './data-source';

export class ConnectionManager {
  private readonly logger: Logger;
  private _connection: DataSource;
  private static _instance: ConnectionManager;
  private static dbConnectionToken = 'DATABASE_CONNECTION';

  private constructor() {
    this.logger = new Logger(ConnectionManager.name);
  }

  public static get instance(): ConnectionManager {
    if (!this._instance) {
      this._instance = new ConnectionManager();
    }
    return this._instance;
  }

  public static getConnectionToken(): string {
    return this.dbConnectionToken;
  }

  public async getConnection() {
    if (!this._connection) {
      this.logger.log('>> Open new connection');
      this._connection = await dataSource.initialize();
      return this._connection;
    }
    this.logger.log('>> Reuse existed connection');
    if (!this._connection.isInitialized) {
      await this._connection.initialize();
    }
    return this._connection;
  }
}
