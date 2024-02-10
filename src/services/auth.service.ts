import { Inject, Injectable } from '@nestjs/common';
import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import { UserRepository } from '../repositories';
import { WhereOperator } from 'src/repositories/firebase/firebase.variable';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/models';

@Injectable()
export class AuthService {
  constructor(@Inject(UserRepository) public userRepository: UserRepository) {
    this.init();
  }

  private init() {
    passport.use(
      new passportLocal.Strategy.LocalStrategy(
        {
          usernameField: 'email',
          passReqToCallback: true,
        },
        async (req, email, password, done) => {
          const foundUser = await this.userRepository.findOne({
            where: {
              fieldKey: 'email',
              operator: WhereOperator.equal,
              fieldValue: email,
            },
          });

          const isMatched = bcrypt.compareSync(password, foundUser.password);
          if (!isMatched) return done(null, false);
          return done(null, foundUser);
        },
      ),
    );

    passport.serializeUser((user: User, done) => {
      return done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
      const user = await this.userRepository.findById(id);
      if (!user) done(null, false);
      return done(null, JSON.stringify(user));
    });
  }

  self() {
    return this;
  }
}
