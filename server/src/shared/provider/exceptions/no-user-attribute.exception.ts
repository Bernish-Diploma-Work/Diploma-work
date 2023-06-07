import { BadRequestException } from '@nestjs/common';

export class NoUserAttributesException extends BadRequestException {
  constructor() {
    super('User has no attributes');
  }
}
