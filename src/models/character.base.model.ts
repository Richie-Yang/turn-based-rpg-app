import { Injectable } from '@nestjs/common';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { Base } from './base.model';
import { IsString } from 'class-validator';

enum Class {
  UR = 'UR',
  'SSR+' = 'SSR+',
  SSR = 'SSR',
  SR = 'SR',
  R = 'R',
  N = 'N',
}

@Injectable()
export class CharacterBase extends Base {
  @IsNotEmpty()
  @IsEnum(Class)
  @IsString()
  class: Class;

  @IsNotEmpty()
  @IsNumber()
  hp: number;

  @IsNotEmpty()
  @IsNumber()
  atk: number;

  @IsNotEmpty()
  @IsNumber()
  def: number;

  @IsNotEmpty()
  @IsNumber()
  spd: number;

  constructor(partial?: Partial<CharacterBase>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
