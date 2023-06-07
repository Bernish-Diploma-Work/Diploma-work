import { BadRequestException } from '@nestjs/common';

export class UserDisabledException extends BadRequestException {
  constructor() {
    super('User is disabled');
  }
}
