import { Injectable } from '@nestjs/common';
import {
  ArrayContains,
  ArrayNotContains,
  Contains,
  IsArray,
  IsEmail,
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

  @IsArray()
  role: Roles[];

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(partial?: Partial<User>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
