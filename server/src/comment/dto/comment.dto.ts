import { IsNumber, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  body: string;

  @IsNumber()
  videoId: number;
}
