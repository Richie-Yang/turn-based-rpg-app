import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Base } from './base.model';
import { IsString } from 'class-validator';

@Injectable()
export class Todo extends Base {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  createdBy: string;

  @IsNotEmpty()
  @IsString()
  todoListId: string;

  constructor(partial?: Partial<Todo>) {
    super();
    if (partial) Object.assign(this, partial);
  }
}
