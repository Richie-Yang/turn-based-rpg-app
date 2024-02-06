import { Inject, Injectable } from '@nestjs/common';
import { CharacterRepository, CharacterBaseRepository } from '../repositories';
import { CharacterBase } from 'src/models';

@Injectable()
export class CharacterService {
  constructor(
    @Inject(CharacterBaseRepository)
    public charBaseRepository: CharacterBaseRepository,
    @Inject(CharacterRepository) public charRepository: CharacterRepository,
  ) {}

  async create(data: CharacterBase) {
    const character = new CharacterBase(data);
    return this.charBaseRepository.create(character);
  }
}
