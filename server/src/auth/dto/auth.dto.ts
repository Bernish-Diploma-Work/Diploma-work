import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { USER_PASSWORD_REGEX } from '../../shared/utils';

export class AuthDto {
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email',
    },
  )
  email!: string;

  @IsString()
  password!: string;
}

export class RegisterDto {
  @IsEmail(
    {},
    {
      message: 'Please provide a valid email',
    },
  )
  email!: string;

  @MinLength(6, {
    message: 'Password must contain at least 6 characters',
  })
  @IsString()
  @Matches(USER_PASSWORD_REGEX, {
    message:
      'Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters',
  })
  password!: string;

  @IsOptional()
  @MaxLength(200, {
    message: 'Description is too big. Max is 200 characters',
  })
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  avatarPath?: string;

  @IsString()
  name!: string;
}
