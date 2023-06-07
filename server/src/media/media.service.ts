import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { configService } from '../shared/config/config.service';

@Injectable()
export class MediaService {
  saveMedia(key: string) {
    return {
      url: `${configService.uploadFiles.url}/${key}`,
      name: key,
    };
  }
}
