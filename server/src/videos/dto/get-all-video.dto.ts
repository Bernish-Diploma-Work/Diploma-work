import { IsOptional, IsString } from 'class-validator';

export class GetAllVideoDto {
  @IsOptional()
  @IsString()
  searchTerm?: string;
}
