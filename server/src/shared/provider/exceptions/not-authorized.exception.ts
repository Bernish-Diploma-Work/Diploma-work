import { BadRequestException } from '@nestjs/common';

export class NotAuthorizedException extends BadRequestException {
  constructor() {
    super('Invalid email or password');
  }
}
