import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { MethodLogger } from '../shared/decorators/method-logger.decorator';
import { UserEntity } from '../shared/database/entities/user.entity';
import { JwtAuthGuard } from '../shared/jwt/jwt-auth-guard';
import { SubscribeDto } from './dto/subscribe.dto';
import { UserEditDto } from './dto/user-edit-dto';
import { JwtUserAuthGuard } from '../shared/jwt/jwt-user-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile/:id')
  @ApiOperation({
    description: 'Get user profile',
  })
  @ApiParam({ type: Number, name: 'id' })
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async getProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(+id);
  }

  @Put('/profile_update/:id')
  @ApiBody({ type: UserEditDto })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserEditDto,
  ) {
    return this.userService.update(dto, id);
  }

  @Get('/all')
  @ApiOperation({
    description: 'Get all users',
  })
  @ApiParam({ type: Number, name: 'id' })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async getAll() {
    return this.userService.getAll();
  }

  @Get('/by_id/:id')
  @ApiOperation({
    description: 'Get user profile',
  })
  @ApiParam({ type: Number, name: 'id' })
  @ApiOkResponse({ type: UserEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getById(+id);
  }

  @Put('/subscribe')
  @ApiBody({ type: SubscribeDto })
  @ApiOkResponse({ type: Boolean })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async subscribe(@Body() dto: SubscribeDto) {
    return this.userService.subscribe(dto.userId, dto.channelToSub);
  }
}
