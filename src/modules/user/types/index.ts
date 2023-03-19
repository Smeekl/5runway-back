import { CreateUserRequestLocalDto, CreateUserRequestDto } from '../dto';

export type TUser = CreateUserRequestDto | CreateUserRequestLocalDto;

export type TOptions = {
  propName: string;
  propValue: string;
  withPassword?: boolean;
};
