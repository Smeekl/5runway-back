import { IsBoolean } from 'class-validator';

export class GetUserOptionsDto {
  @IsBoolean()
  withPassword?: boolean;
}
