import { BadRequestException } from '@nestjs/common';

export class UserNotConfirmedException extends BadRequestException {
  constructor() {
    super('User is not confirmed');
  }
}
