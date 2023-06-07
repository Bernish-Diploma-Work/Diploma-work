import { BadRequestException } from '@nestjs/common';

export class UserValidationException extends BadRequestException {
  constructor() {
    super();
  }
}
