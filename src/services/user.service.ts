import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { User } from 'src/models';

@Injectable()
export class UserService {
  constructor(@Inject(UserRepository) public userRepository: UserRepository) {}

  async createUser(data: User) {
    const user = new User(data);
    return this.userRepository.create(user);
  }
}
