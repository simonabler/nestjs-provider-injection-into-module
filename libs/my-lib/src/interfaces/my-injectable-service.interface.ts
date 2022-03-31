import { User } from '../model/user.model';

export interface MyInjectableService {
  createEntry(userToCreate: User): User;
  findAll(): Promise<User[]> | User[];
}
