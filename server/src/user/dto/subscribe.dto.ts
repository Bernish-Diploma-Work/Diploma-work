import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class SubscribeDto {
  @ApiProperty()
  @IsInt()
  userId: number;

  @ApiProperty()
  @IsInt()
  channelToSub: number;
}
