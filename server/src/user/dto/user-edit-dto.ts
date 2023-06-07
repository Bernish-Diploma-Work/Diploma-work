import { IsOptional, IsString } from 'class-validator';

export class UserEditDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  avatarPath?: string;
}
