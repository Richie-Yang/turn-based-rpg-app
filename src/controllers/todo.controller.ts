import {
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { Todo } from 'src/models';
import { ParseFilterPipe } from 'src/pipes/json.pipe';
import { TodoRepository } from 'src/repositories';
import {
  FilterQuery,
  PageResult,
} from 'src/repositories/firebase/firebase.type';

@Controller()
export class TodoController {
  constructor(@Inject(TodoRepository) public todoRepository: TodoRepository) {}

  @Get(':id')
  getTodoById(@Param('id') id: string): Promise<Todo> {
    return this.todoRepository.findById(id);
  }

  @Get()
  getUsers(
    @Query('filter', ParseFilterPipe) filter?: FilterQuery,
  ): Promise<PageResult<Todo> | Todo[]> {
    return this.todoRepository.find(filter);
  }

  @Post(':id')
  async createTodo(@Body() body: Todo): Promise<Todo> {
    const todo = new Todo(body);
    return this.todoRepository.create(todo);
  }

  @Patch(':id')
  async updateTodo(
    @Param('id') id: string,
    @Body() body: Partial<Todo>,
  ): Promise<Todo> {
    const todo = new Todo(body);
    return this.todoRepository.updateById(id, todo);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id: string): Promise<void> {
    await this.todoRepository.deleteById(id);
  }
}
