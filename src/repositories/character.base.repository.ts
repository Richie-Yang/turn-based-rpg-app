import { Injectable } from '@nestjs/common';
import { FirebaseRepository } from './firebase.repository';
import { CharacterBase } from '../models';
import { Models } from 'src/variables';

@Injectable()
export class CharacterBaseRepository extends FirebaseRepository<CharacterBase> {
  modelName = Models.CHARACTER_BASE;
}
