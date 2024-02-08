import { Base } from 'src/models/base.model';
import * as firebaseRepository from './firebase';
import { FilterQuery } from './firebase/firebase.type';

export abstract class FirebaseRepository<M extends Base> {
  abstract modelName: string;

  deserialize<M>(data: M): M {
    return { ...data };
  }

  async create(data: M) {
    const createResult = await firebaseRepository.create(
      this.modelName,
      this.deserialize(data),
    );
    return this.findById(createResult.id);
  }

  async find(filter?: FilterQuery) {
    return firebaseRepository.findAll<M>(this.modelName, filter);
  }

  async findPaged(filter?: FilterQuery) {
    return firebaseRepository.findPaged<M>(this.modelName, filter);
  }

  async findById(id: string) {
    const rawUser = await firebaseRepository.findById(this.modelName, id);
    return (rawUser.data ?? {}) as M;
  }

  async updateById(id: string, data: Partial<M>) {
    await firebaseRepository.updateById(
      this.modelName,
      id,
      this.deserialize(data),
    );
    return this.findById(id);
  }

  async deleteById(id: string) {
    return firebaseRepository.deleteById(this.modelName, id);
  }
}
