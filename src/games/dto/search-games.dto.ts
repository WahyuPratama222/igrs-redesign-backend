import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchGamesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  q: string;
}