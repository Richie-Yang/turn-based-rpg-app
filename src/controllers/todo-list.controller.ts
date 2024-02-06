import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TodoList } from 'src/models';
import { ParseFilterPipe } from 'src/pipes/json.pipe';
import { TodoListRepository } from 'src/repositories';
import {
  FilterQuery,
  PageResult,
} from 'src/repositories/firebase/firebase.type';

@Controller()
export class TodoListController {
  constructor(
    @Inject(TodoListRepository) public todoListRepository: TodoListRepository,
  ) {}

  @Get(':id')
  getTodoListById(@Param('id') id: string): Promise<TodoList> {
    return this.todoListRepository.findById(id);
  }

  @Get()
  getTodoLists(
    @Query('filter', ParseFilterPipe) filter?: FilterQuery,
  ): Promise<PageResult<TodoList> | TodoList[]> {
    return this.todoListRepository.find(filter);
  }

  @Post()
  async createTodoList(@Body() body: TodoList): Promise<TodoList> {
    const todoList = new TodoList(body);
    return this.todoListRepository.create(todoList);
  }

  @Patch(':id')
  async updateTodoList(
    @Param('id') id: string,
    @Body() body: Partial<TodoList>,
  ): Promise<TodoList> {
    const todoList = new TodoList(body);
    return this.todoListRepository.updateById(id, todoList);
  }

  @Delete(':id')
  async deleteTodoListById(@Param('id') id: string): Promise<void> {
    await this.todoListRepository.deleteById(id);
  }
}
