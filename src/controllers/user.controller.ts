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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards';
import { User } from 'src/models';
import { ParseFilterPipe } from 'src/pipes/json.pipe';
import { UserRepository } from 'src/repositories';
import {
  FilterQuery,
  PageResult,
} from 'src/repositories/firebase/firebase.type';
import { UserService } from 'src/services';
import { AuthService } from 'src/services/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    @Inject(UserRepository) public userRepository: UserRepository,
  ) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }): Promise<string> {
    return this.authService.login(body.email, body.password);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userRepository.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getUsers(
    @Query('filter', ParseFilterPipe) filter?: FilterQuery,
  ): Promise<PageResult<User> | User[]> {
    return this.userRepository.find(filter);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createUser(@Body() body: User): Promise<User> {
    const user = new User(body);
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: Partial<User>,
  ): Promise<User> {
    const user = new User(body);
    return this.userRepository.updateById(id, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
