import { User } from '../User';
import { JsonUserStorage } from '../storage/JsonUserStorage';
import { UserValidator } from '../validators/UserValidator';
import { UserError } from '../errors/UserError';

export class UserService {
  private storage: JsonUserStorage;
  constructor(filename = 'users.json') {
    this.storage = new JsonUserStorage(filename);
  }
  async addUser(user: User): Promise<void> {
    UserValidator.validate(user);
    const users = await this.storage.read();
    if (users.find(u => u.id === user.id)) {
      throw new UserError(`User with id ${user.id} already exists`);
    }
    users.push(user);
    await this.storage.write(users);
  }
  async getUser(id: string): Promise<User | undefined> {
    const users = await this.storage.read();
    return users.find(u => u.id === id);
  }
  async updateUser(id: string, data: Partial<User>): Promise<void> {
    const users = await this.storage.read();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) throw new UserError(`User with id ${id} not found`);
    users[index] = { ...users[index], ...data };
    await this.storage.write(users);
  }
  async deleteUser(id: string): Promise<void> {
    let users = await this.storage.read();
    users = users.filter(u => u.id !== id);
    await this.storage.write(users);
  }
  async listUsers(): Promise<User[]> {
    return await this.storage.read();
  }
}
