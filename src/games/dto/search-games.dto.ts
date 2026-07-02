import { IsString, IsNotEmpty } from 'class-validator';

export class SearchGamesDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}