import { config } from 'dotenv';
import { AwsCredentialIdentity } from '@aws-sdk/types';

config();

export const ENVIRONMENTS = {
  TEST: 'test',
  LOCAL: 'local',
  DEVELOP: 'dev',
  STAGE: 'stage',
  PRODUCTION: 'prod',
} as const;
export type Environments = (typeof ENVIRONMENTS)[keyof typeof ENVIRONMENTS];

export interface CognitoConfig {
  userPoolId: string;
  /** JWT audience */
  clientId: string;
  jwksUri: string;
  issuer: string;
}

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing && !this.isUnitTestsRunning) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value === undefined ? '' : value;
  }

  public ensureValues(keys: string[]) {
    if (this.isUnitTestsRunning || this.isDevMode) {
      return this;
    }
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getBoolean(key: string, throwOnMissing = true): boolean {
    return this.getValue(key, throwOnMissing) === 'true';
  }

  public getNumber(key: string, throwOnMissing = true): number {
    const number = +this.getValue(key, throwOnMissing);
    if (!Number.isFinite(number)) {
      throw new Error(`config error - invalid numeric parameter env.${key}`);
    }
    return number;
  }

  private get isUnitTestsRunning(): boolean {
    return process.env.NODE_ENV === ENVIRONMENTS.TEST;
  }

  public get isDevMode(): boolean {
    return this.getValue('NODE_ENV') === ENVIRONMENTS.DEVELOP;
  }

  public get isProductionMode(): boolean {
    return this.getValue('NODE_ENV') === ENVIRONMENTS.PRODUCTION;
  }

  public get environment(): Environments {
    const env = this.getValue('NODE_ENV');
    switch (env) {
      case ENVIRONMENTS.LOCAL:
        return ENVIRONMENTS.LOCAL;
      case ENVIRONMENTS.DEVELOP:
        return ENVIRONMENTS.DEVELOP;
      case ENVIRONMENTS.STAGE:
        return ENVIRONMENTS.STAGE;
      case ENVIRONMENTS.TEST:
        return ENVIRONMENTS.TEST;
      case ENVIRONMENTS.PRODUCTION:
        return ENVIRONMENTS.PRODUCTION;
      default:
        throw new Error(`unknown env NODE_ENV=${env}`);
    }
  }

  public get DBHost() {
    return this.getValue('RDS_HOST', true);
  }

  public get DBPort() {
    return this.getNumber('RDS_PORT', true);
  }

  public get DBUserName() {
    return this.getValue('RDS_USERNAME', true);
  }

  public get DBPassword() {
    return this.getValue('RDS_PASSWORD', true);
  }

  public get DBName() {
    return this.getValue('RDS_NAME', true);
  }

  public get TYPEORMLogging() {
    return this.getBoolean('TYPEORM_LOGGING', true);
  }

  public get TYPEORMSynchronize() {
    return this.getBoolean('TYPEORM_SYNCHRONIZE', true);
  }

  public get TYPEORMMaxQueryExecutionTime() {
    return this.getNumber('TYPEORM_MAX_QUERY_EXECUTION_TIME', true);
  }

  public get JWTSecret() {
    return this.getValue('JWT_SECRET', true);
  }

  public get awsRegion(): string {
    return this.getValue('AWS_DEFAULT_REGION');
  }

  public get awsConfig(): {
    credentials: AwsCredentialIdentity;
    region: string;
  } {
    const credCfg: AwsCredentialIdentity = {
      accessKeyId: this.getValue('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.getValue('AWS_SECRET_ACCESS_KEY'),
    };
    // if (!this.isLocalDevMode && !this.isLocalTestMode) {
    //   credCfg.sessionToken = this.getValue('AWS_SESSION_TOKEN');
    // }
    return {
      credentials: credCfg,
      region: this.awsRegion,
    };
  }

  public get uploadFiles() {
    return {
      bucket: 'bernish-diploma-back-dev-static',
      path: '/',
      url: 'https://bernish-diploma-back-dev-static.s3.eu-central-1.amazonaws.com',
    };
  }

  private getIssuer(userPoolId: string): string {
    return `https://cognito-idp.${this.awsRegion}.amazonaws.com/${userPoolId}`;
  }

  private getJwksUri(issuer: string): string {
    return `${issuer}/.well-known/jwks.json`;
  }

  public get adminCognito(): CognitoConfig {
    const userPoolId = this.getValue('COGNITO_USER_USER_POOL_ID');
    const issuer = this.getIssuer(userPoolId);
    return {
      userPoolId,
      clientId: this.getValue('COGNITO_USER_CLIENT_ID'),
      jwksUri: this.getJwksUri(issuer),
      issuer,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'NODE_ENV',
  'TYPEORM_MIGRATIONS_DIR',
  'TYPEORM_LOGGING',
  'TYPEORM_SYNCHRONIZE',
  'TYPEORM_MAX_QUERY_EXECUTION_TIME',
  'RDS_HOST',
  'RDS_PORT',
  'RDS_USERNAME',
  'RDS_NAME',
  'JWT_SECRET',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_ACCESS_KEY_ID',
  'AWS_DEFAULT_REGION',
  'COGNITO_USER_USER_POOL_ID',
  'COGNITO_USER_CLIENT_ID',
]);

export { configService };
