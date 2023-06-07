import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignOutDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
