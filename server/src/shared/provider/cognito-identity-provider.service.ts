import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import {
  AdminGetUserCommandOutput,
  AttributeType,
  CognitoIdentityProvider,
  InitiateAuthCommandOutput,
} from '@aws-sdk/client-cognito-identity-provider';
import { configService } from '../config/config.service';
import { SigInDto } from './dto/sign-in.dto';
import { AuthTokensVm } from './vm/auth-token.vm';
import { COGNITO_CODES } from '../constants/user-auth.constants';
import { NotAuthorizedException } from './exceptions/not-authorized.exception';
import { SignInException } from './exceptions/sign-in.exception';
import { SignOutDto } from './dto/sign-out.dto';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { NoUserAttributesException } from './exceptions/no-user-attribute.exception';
import { UserNotConfirmedException } from './exceptions/user-not-confirmed-exception';
import { UserDisabledException } from './exceptions/user-disabled-exception';
import { UserValidationException } from './exceptions/user-validation.exception';

@Injectable()
export class CognitoIdentityProviderService {
  private readonly logger: Logger;
  private readonly cognito: CognitoIdentityProvider;
  private readonly userPoolId: string;
  private readonly clientId: string;

  constructor() {
    const { userPoolId, clientId } = configService.adminCognito;
    this.logger = new Logger(CognitoIdentityProviderService.name);
    this.cognito = new CognitoIdentityProvider(configService.awsConfig);
    this.userPoolId = userPoolId;
    this.clientId = clientId;
  }

  async signUp({ email, password }: SigInDto): Promise<string> {
    const attributes: AttributeType[] = [];
    attributes.push(this.buildAttribute('email', email));
    try {
      const result = await this.cognito.signUp({
        ClientId: this.clientId,
        Username: email,
        Password: password,
        UserAttributes: attributes,
      });
      this.logger.log(`User ${result.UserSub} is signed up`);
      await this.cognito.adminConfirmSignUp({
        Username: result.UserSub,
        UserPoolId: this.userPoolId,
      });
      this.logger.log(`User ${result.UserSub} sign up is confirmed`);
      return result.UserSub;
    } catch (e) {
      this.logger.error(e);
      if (e.name === 'UsernameExistsException') {
        throw 'UsernameExistsException';
      }
      throw new BadRequestException();
    }
  }

  async signIn({ email, password }: SigInDto): Promise<AuthTokensVm> {
    let data: InitiateAuthCommandOutput;
    try {
      data = await this.cognito.initiateAuth({
        ClientId: this.clientId,
        AuthFlow: 'USER_PASSWORD_AUTH',
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      });
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      if (e.name === COGNITO_CODES.NOT_AUTHORIZED) {
        throw new NotAuthorizedException();
      }
      throw new SignInException();
    }
    this.logger.log(`User ${email} is signed in`);
    await this.checkUserExist(email);
    return {
      idToken: data.AuthenticationResult?.IdToken,
      accessToken: data.AuthenticationResult?.AccessToken,
      refreshToken: data.AuthenticationResult?.RefreshToken,
    };
  }

  async signOut(email: string, dto: SignOutDto): Promise<void> {
    try {
      await this.cognito.globalSignOut({
        AccessToken: dto.accessToken,
      });
      this.logger.log(`User ${email} is signed out`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  async checkUserExist(sub: string): Promise<AdminGetUserCommandOutput> {
    let user: AdminGetUserCommandOutput;
    try {
      user = await this.cognito.adminGetUser({
        UserPoolId: this.userPoolId,
        Username: sub,
      });
    } catch (e) {
      this.logger.error(JSON.stringify(e));
      if (e.name === COGNITO_CODES.USER_NOT_FOUND) {
        this.logger.error(`User ${sub} not found`);
        throw new UserNotFoundException();
      }
      throw new UserValidationException();
    }
    if (!user.Enabled) {
      this.logger.error(`User ${sub} is disabled`);
      throw new UserDisabledException();
    }
    if (!user.UserAttributes) {
      this.logger.error(`User ${sub} doesn't have attributes`);
      throw new NoUserAttributesException();
    }
    if (user.UserStatus !== 'CONFIRMED') {
      this.logger.error(`User ${sub} status is ${user.UserStatus}`);
      throw new UserNotConfirmedException();
    }
    return user;
  }

  private buildAttribute(name, value): AttributeType {
    return {
      Name: name,
      Value: value,
    };
  }
}
