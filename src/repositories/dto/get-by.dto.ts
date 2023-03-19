import { IsString } from 'class-validator';

export class GetByDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
