import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { IsString } from 'class-validator';
import { CharacterBase } from './character.base.model';

@Injectable()
export class Character extends CharacterBase {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  level: number;

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

  constructor(partial?: Partial<Character>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
