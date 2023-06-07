import {
  CanActivate,
  CustomDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

export const ContentTypes = (...types: string[]): CustomDecorator<string> =>
  SetMetadata('types', types);

@Injectable()
export class ContentTypesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const types = this.reflector.get<string[]>('types', context.getHandler());
    if (!types || types.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    if (request.is(types)) {
      return true;
    }
    throw new UnsupportedMediaTypeException();
  }
}
