import { Injectable, Logger } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import {
  GetObjectCommandInput,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3/dist-types/commands/GetObjectCommand';
import {
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
} from '@aws-sdk/client-s3/dist-types/commands/DeleteObjectCommand';
import {
  PutObjectCommandInput,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3/dist-types/commands/PutObjectCommand';
import {
  _Object as ListObject,
  PutObjectRequest,
} from '@aws-sdk/client-s3/dist-types/models/models_0';
import {
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
} from '@aws-sdk/client-s3/dist-types/commands/ListObjectsCommand';
import { configService } from '../../config/config.service';

@Injectable()
export class S3Service {
  private readonly s3: S3;
  private logger = new Logger(S3Service.name);

  constructor() {
    this.s3 = new S3({ ...configService.awsConfig, apiVersion: '2010-12-01' });
  }

  get client() {
    return this.s3;
  }

  async getObject(
    bucket: string,
    key: string,
  ): Promise<GetObjectCommandOutput> {
    const params: GetObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };
    return this.s3.getObject(params);
  }

  async deleteObject(
    bucket: string,
    key: string,
  ): Promise<DeleteObjectCommandOutput> {
    const params: DeleteObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };
    this.logger.log(`deleting s3 file  ${key} from ${bucket}`);
    return this.s3.deleteObject(params);
  }

  async putObject(
    bucket: string,
    key: string,
    file: PutObjectRequest['Body'] | string | Uint8Array | Buffer,
  ): Promise<PutObjectCommandOutput> {
    const params: PutObjectCommandInput = {
      Bucket: bucket,
      Key: key,
      Body: file,
    };
    return this.s3.putObject(params);
  }

  async listObjects(bucket: string, key: string): Promise<ListObject[]> {
    try {
      const params: ListObjectsCommandInput = {
        Bucket: bucket,
        Delimiter: '/',
        Prefix: key,
      };
      const list: ListObject[] = [];
      let response: ListObjectsCommandOutput;
      do {
        response = await this.s3.listObjects(params);
        params.Marker = response.NextMarker;
        list.push(...(response.Contents || []));
      } while (response.IsTruncated);
      return list;
    } catch (e) {
      this.logger.log('Failed to list objects');
      this.logger.error(e);
      throw e;
    }
  }

  isFile(key: string | undefined): boolean {
    return !!key && key.slice(-1) !== '/';
  }
}

export const s3Service = new S3Service();
