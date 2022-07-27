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

class UpdatePublisherIncomingData {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

export class UpdateGameDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => UpdatePublisherIncomingData)
  publisher: UpdatePublisherIncomingData;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsString()
  releaseDate: string;
}
