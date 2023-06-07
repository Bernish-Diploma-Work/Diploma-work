import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../shared/database/entities/user.entity';
import { Repository } from 'typeorm';
import { genSalt, hash, compare } from 'bcrypt';
import { AuthVmBuilder } from './builders/auth-vm.builder';
import * as jwt from 'jsonwebtoken';
import { ivsService } from '../shared/services/ivs/ivs.service';
import { CognitoIdentityProviderService } from '../shared/provider/cognito-identity-provider.service';
import { UserNotFoundException } from '../shared/provider/exceptions/user-not-found.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly provider: CognitoIdentityProviderService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
      select: ['id', 'email'],
    });

    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const tokens = await this.provider.signIn({
      email: user.email,
      password: dto.password,
    });

    return {
      user: AuthVmBuilder.toVm(user, tokens.idToken),
    };
  }

  async registerUser(dto: RegisterDto) {
    const oldUser = await this.userRepository.findOneBy({ email: dto.email });

    if (oldUser) {
      throw new BadRequestException('Email is already in use');
    }

    const newUser = new UserEntity();

    newUser.email = dto.email;
    newUser.description = dto.description;
    newUser.avatarPath = dto.avatarPath;
    newUser.name = dto.name || 'default_user';
    const sub = await this.provider.signUp({
      email: dto.email,
      password: dto.password,
    });

    newUser.sub = sub;

    await this.userRepository.save(newUser);

    const arn = await ivsService.createChannel(newUser.id);

    newUser.streamArn = arn;
    await this.userRepository.save(newUser);

    const tokens = await this.provider.signIn({
      email: newUser.email,
      password: dto.password,
    });

    return {
      user: AuthVmBuilder.toVm(newUser, tokens.idToken),
    };
  }

  async validateUser(sub: string) {
    await this.provider.checkUserExist(sub);
    const user = await this.userRepository.findOneBy({ sub });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
