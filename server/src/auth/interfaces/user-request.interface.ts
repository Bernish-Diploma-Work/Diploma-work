import { UserEntity } from '../../shared/database/entities/user.entity';

export interface IUserRequest extends Request {
  user: UserEntity;
}
