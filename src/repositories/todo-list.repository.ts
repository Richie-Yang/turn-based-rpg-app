import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from './firebase.repository';
import { TodoList } from '../models';
import { Models } from 'src/variables';

@Injectable()
export class TodoListRepository extends FirebaseRepository<TodoList> {
  modelName = Models.TODO_LIST;
}
