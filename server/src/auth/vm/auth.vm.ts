import { ApiProperty } from '@nestjs/swagger';

export class AuthVm {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  accessToken: string;
}
