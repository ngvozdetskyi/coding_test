import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ApplySalesDeleteOldGamesDto {
  @IsNotEmpty()
  @IsString()
  deleteOldGamesFrom: string;

  @IsNotEmpty()
  @IsNumber()
  percentsOfSale: number;

  @IsNotEmpty()
  @IsString()
  applySaleFrom: string;

  @IsNotEmpty()
  @IsString()
  applySaleTo: string;
}
