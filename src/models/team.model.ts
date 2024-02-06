import { Injectable } from '@nestjs/common';
import { IsArray, IsEmpty, IsNotEmpty } from 'class-validator';
import { Base } from './base.model';
import { IsString } from 'class-validator';

@Injectable()
export class Team extends Base {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  @IsArray()
  layout: Array<number>;

  constructor(partial?: Partial<Team>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
