import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreatePublisherIncomingData {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  siret: number;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreatePublisherIncomingData)
  publisher: CreatePublisherIncomingData;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsString()
  releaseDate: string;
}
