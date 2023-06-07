import {
  Controller,
  HttpException,
  InternalServerErrorException,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ContentTypes,
  ContentTypesGuard,
} from '../shared/guards/content-types.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiFile } from '../shared/decorators/api-file.decorator';
import { JwtAuthGuard } from '../shared/jwt/jwt-auth-guard';
import { MethodLogger } from '../shared/decorators/method-logger.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { FILE_SIZE_LIMIT } from '../shared/utils';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { IUploadFiles } from '../shared/interfaces/upload-files.interface';
import { MediaService } from './media.service';
import { configService } from '../shared/config/config.service';
import { getMulterConfig } from '../shared/services/multerS3/multerS3.service';
import { s3Service } from '../shared/services/s3/s3.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/upload')
  @UseGuards(ContentTypesGuard)
  @ApiOperation({ description: 'Upload file' })
  @ContentTypes('application/json', 'multipart/form-data')
  @ApiFile('media')
  @ApiConsumes('multipart/form-data')
  @ApiBadRequestResponse({ type: HttpException })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'media',
          maxCount: 1,
        },
      ],
      getMulterConfig({
        s3: s3Service.client,
        bucket: configService.uploadFiles.bucket,
        path: configService.uploadFiles.path,
        // fileFilter: filter,
      }),
    ),
  )
  @MethodLogger()
  async upload(@UploadedFiles() files: IUploadFiles) {
    if (!files.media?.at(0)) {
      throw new InternalServerErrorException();
    }

    return this.mediaService.saveMedia(files.media[0].key);
  }
}
