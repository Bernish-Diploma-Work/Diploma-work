import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { VideoService } from './video.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';
import { UserEntity } from '../shared/database/entities/user.entity';
import { VideoEntity } from '../shared/database/entities/video.entity';
import { MethodLogger } from '../shared/decorators/method-logger.decorator';
import { GetAllVideoDto } from './dto/get-all-video.dto';
import { JwtAuthGuard } from '../shared/jwt/jwt-auth-guard';
import { VideoDto } from './dto/video.dto';
import { JwtUserAuthGuard } from '../shared/jwt/jwt-user-auth.guard';
import { IUserRequest } from '../auth/interfaces/user-request.interface';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get('/all')
  @ApiOperation({ summary: 'Get video list' })
  @ApiQuery({
    type: GetAllVideoDto,
    required: false,
  })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiOkResponse({ type: VideoEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async getAll(@Query() dto: GetAllVideoDto) {
    return this.videoService.getAll(dto.searchTerm);
  }

  @Put('/update/:id')
  @ApiOkResponse({ type: VideoEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async updateVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: VideoDto,
  ) {
    return this.videoService.updateVideo(id, dto);
  }

  @Get('/by_id/:id')
  @ApiOperation({ summary: 'Get video' })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiOkResponse({ type: VideoEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.getById(id);
  }

  @Get('/most_viewed')
  @ApiOperation({ summary: 'Get most-viewed video list' })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiOkResponse({ type: VideoEntity, isArray: true })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async getMostViewed() {
    return this.videoService.getMostViewed();
  }

  @Put('/update_reaction/:id')
  @ApiOkResponse({ type: VideoEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async updateReactions(
    @Param('id', ParseIntPipe) id: number,
    @Req()
    req: IUserRequest,
  ) {
    return this.videoService.updateReaction(id, +req.user.id);
  }

  @Post('/create')
  @ApiOkResponse({ type: VideoEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async create(
    @Req()
    req: IUserRequest,
  ) {
    const videoId = await this.videoService.create(+req.user.id);
    return videoId.toString();
  }

  @Delete('delete/:id')
  @ApiOkResponse({ type: undefined })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.videoService.delete(id);
  }

  @Put('/increment_views/:id')
  @ApiOperation({ summary: 'Get most-viewed video list' })
  @ApiInternalServerErrorResponse({ type: HttpException })
  @ApiOkResponse({ type: VideoEntity })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @MethodLogger()
  async increment_views(@Param('id', ParseIntPipe) id: number) {
    return this.videoService.incrementViews(id);
  }

  @Post('/stop-stream/:id')
  @ApiOkResponse({ type: undefined })
  @ApiBadRequestResponse({ type: HttpException })
  @ApiNotFoundResponse({ type: HttpException })
  @ApiBearerAuth()
  @UseGuards(JwtUserAuthGuard)
  @MethodLogger()
  async stop(@Param('id', ParseIntPipe) id: number) {
    await this.videoService.stopStream(id);
  }
}
