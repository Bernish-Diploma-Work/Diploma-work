import { UserEntity } from '../../shared/database/entities/user.entity';
import { AuthVm } from '../vm/auth.vm';

export class AuthVmBuilder {
  static toVm(user: UserEntity, accessToken: string): AuthVm {
    const vm = new AuthVm();
    vm.id = user.id;
    vm.email = user.email;
    vm.accessToken = accessToken;
    return vm;
  }
}
