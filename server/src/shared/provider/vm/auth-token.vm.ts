import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensVm {
  @ApiProperty()
  idToken: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
