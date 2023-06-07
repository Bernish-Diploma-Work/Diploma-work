import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ContentTypes,
  ContentTypesGuard,
} from '../shared/guards/content-types.guard';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthVm } from './vm/auth.vm';
import { AuthDto, RegisterDto } from './dto/auth.dto';
import { MethodLogger } from '../shared/decorators/method-logger.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ContentTypesGuard)
  @ContentTypes('application/json')
  @ApiOperation({ description: 'Login user' })
  @ApiBody({ type: AuthDto })
  @ApiOkResponse({ type: AuthVm })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ContentTypesGuard)
  @ContentTypes('application/json')
  @ApiOperation({ description: 'Register user' })
  @ApiBody({ type: RegisterDto })
  @ApiOkResponse({ type: AuthVm })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async register(@Body() dto: RegisterDto) {
    return this.authService.registerUser(dto);
  }
}
