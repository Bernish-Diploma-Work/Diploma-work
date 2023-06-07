import { S3 } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export interface GetMulterConfigInterface {
  s3: S3;
  bucket: string;
  path: string;
  limits?: {
    fields?: number;
    fileSize?: number;
    files?: number;
  };
  fileFilter?: (
    _req: Request,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => void;
}

export function getMulterConfig(
  config: GetMulterConfigInterface,
): MulterOptions {
  const { s3, bucket, path, fileFilter, limits } = config;
  try {
    return {
      storage: multerS3({
        s3,
        bucket,
        contentType: contentTypeCallback,
        key: editFileName(path),
      }),
      fileFilter,
      limits,
    };
  } catch (e) {
    console.log(e);
  }
}

export function contentTypeCallback(
  _req: Request,
  file: Express.Multer.File,
  cb: any,
) {
  cb(null, file.mimetype);
}

export function editFileName(pathName: string) {
  return (
    req: any,
    file: Express.Multer.File,
    callback: (error: Error | null, filename: string) => void,
  ) => {
    const fileExtension = path.extname(file.originalname);
    const name = uuidv4() + fileExtension;
    return callback(null, `${pathName}/${name}`);
  };
}
