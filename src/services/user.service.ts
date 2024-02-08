import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { User } from 'src/models';
import { WhereOperator } from 'src/repositories/firebase/firebase.variable';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  DEFAULT_SALT_ROUNDS = 10;

  constructor(@Inject(UserRepository) public userRepository: UserRepository) {}

  async create(data: User) {
    const user = new User(data);
    const foundUser = await this.userRepository.find({
      where: {
        fieldKey: 'email',
        operator: WhereOperator.equal,
        fieldValue: data.email,
      },
    });
    if (foundUser.length > 0) throw new Error('User already exists');
    const salt = bcrypt.genSaltSync(this.DEFAULT_SALT_ROUNDS);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return this.userRepository.create(user);
  }
}
