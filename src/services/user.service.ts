import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories';
import { User } from 'src/models';
import { WhereOperator } from 'src/repositories/firebase/firebase.variable';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  DEFAULT_SALT_ROUNDS = 10;

  constructor(
    private jwtService: JwtService,
    @Inject(UserRepository) public userRepository: UserRepository,
  ) {}

  async create(data: User) {
    const user = new User(data);
    const foundUser = await this.userRepository.find({
      where: {
        fieldKey: 'email',
        operator: WhereOperator.equal,
        fieldValue: data.email,
      },
    });
    if (foundUser.length > 0)
      throw new HttpException('User already exists', 400);
    const salt = bcrypt.genSaltSync(this.DEFAULT_SALT_ROUNDS);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return this.userRepository.create(user);
  }

  async login(email: string, password: string) {
    const foundUser = await this.userRepository.findOne({
      where: {
        fieldKey: 'email',
        operator: WhereOperator.equal,
        fieldValue: email,
      },
    });

    const isMatched = bcrypt.compareSync(password, foundUser.password);
    if (!isMatched) throw new UnauthorizedException();
    const payload = { sub: foundUser.id, username: foundUser.name };
    return this.jwtService.signAsync(payload);
  }
}
