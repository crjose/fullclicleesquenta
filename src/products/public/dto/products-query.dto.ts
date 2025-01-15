import { Min, IsInt, IsOptional, IsString } from 'class-validator';

export class ProductQueryDto {
  @IsString()
  @IsOptional()
  name: string;

  @Min(1)
  @IsInt()
  @IsOptional()
  page: number;

  @Min(1)
  @IsInt()
  @IsOptional()
  limit: number;
}
