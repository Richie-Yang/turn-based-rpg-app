import { Injectable } from '@nestjs/common';
import {
  ArrayContains,
  IsArray,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
} from 'class-validator';
import { Base } from './base.model';
import { IsString } from 'class-validator';
import { Roles } from 'src/variables';

@Injectable()
export class User extends Base {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEmpty()
  @IsArray()
  @ArrayContains(Object.values(Roles))
  role: Roles[];

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(partial?: Partial<User>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
