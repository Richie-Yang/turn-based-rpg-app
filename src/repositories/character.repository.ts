import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from './firebase.repository';
import { Character } from '../models';
import { Models } from 'src/variables';

@Injectable()
export class CharacterRepository extends FirebaseRepository<Character> {
  modelName = Models.CHARACTER;
}
