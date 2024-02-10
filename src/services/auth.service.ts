import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserRepository } from '../repositories';
import { WhereOperator } from 'src/repositories/firebase/firebase.variable';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) public userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<string> {
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
