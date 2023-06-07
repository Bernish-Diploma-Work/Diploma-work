import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class VideoDto {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  videoPath?: string;

  @IsString()
  thumbnailPath: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsBoolean()
  isStream: boolean;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isProcessing?: boolean;
}
