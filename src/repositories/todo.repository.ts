import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from './firebase.repository';
import { Todo } from '../models';
import { Models } from 'src/variables';

@Injectable()
export class TodoRepository extends FirebaseRepository<Todo> {
  modelName = Models.TODO;
}
