import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../shared/jwt/jwt-auth-guard';
import { CommentDto } from './dto/comment.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CommentEntity } from '../shared/database/entities/comment.entity';
import { MethodLogger } from '../shared/decorators/method-logger.decorator';
import { JwtUserAuthGuard } from '../shared/jwt/jwt-user-auth.guard';
import { IUserRequest } from '../auth/interfaces/user-request.interface';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  @UseGuards(JwtUserAuthGuard)
  @ApiBody({ type: CommentDto })
  @ApiOkResponse({ type: CommentEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBearerAuth()
  @MethodLogger()
  async create(
    @Req()
    req: IUserRequest,
    @Body() dto: CommentDto,
  ) {
    return this.commentService.create(+req.user.id, dto);
  }
}
