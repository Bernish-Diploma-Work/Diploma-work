import { DataSource } from 'typeorm';
import { databaseService } from './database.service';

const dataSource = new DataSource(databaseService.config);

export default dataSource;
