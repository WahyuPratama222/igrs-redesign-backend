export class QueryGamesDto {
  q?: string;
  platform?: string;
  rating?: string;
  genre?: string;
  mode?: string | string[];
  sort?: string;
  page?: string;
  limit?: string;
}
