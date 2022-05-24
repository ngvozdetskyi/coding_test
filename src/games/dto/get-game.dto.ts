import { IsNumber, IsString, ValidateIf } from 'class-validator';

export class GetGamesQuery {
  @IsString()
  @ValidateIf((dto: GetGamesQuery) => !dto.title && !dto.price)
  releaseDate?: string;

  @IsString()
  @ValidateIf((dto: GetGamesQuery) => !dto.releaseDate && !dto.price)
  title?: string;

  @IsNumber()
  @ValidateIf((dto: GetGamesQuery) => !dto.releaseDate && !dto.title)
  price?: number;
}
