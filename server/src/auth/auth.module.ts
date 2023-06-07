import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../shared/database/database.module';
import { UserEntity } from '../shared/database/entities/user.entity';
import { JwtUserStrategy } from '../shared/jwt/jwt-user.strategy';
import { PassportModule } from '@nestjs/passport';
import { CognitoIdentityProviderService } from '../shared/provider/cognito-identity-provider.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt-user' }),
  ],
  providers: [
    AuthService,
    ...DatabaseModule.getProvidersForEntities([UserEntity]),
    JwtUserStrategy,
    CognitoIdentityProviderService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
