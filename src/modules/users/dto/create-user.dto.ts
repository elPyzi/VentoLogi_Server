import { REGEX } from '@shared/constants/regex';
import {
  LOGIN_MAX_LENGTH,
  LOGIN_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@modules/users/constants';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import type { ClientType } from '@shared/models';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(LOGIN_MIN_LENGTH, LOGIN_MAX_LENGTH)
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH)
  password: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(REGEX.PHONE)
  phoneNumber: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  clientType?: ClientType;
}
