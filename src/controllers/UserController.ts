import { UserService } from '../services/UserService';
import { User } from '../User';

export class UserController {
  private service: UserService;
  constructor() {
    this.service = new UserService();
  }
  async createUser(user: User) {
    await this.service.addUser(user);
  }
  async getUser(id: string) {
    return await this.service.getUser(id);
  }
  async updateUser(id: string, data: Partial<User>) {
    await this.service.updateUser(id, data);
  }
  async deleteUser(id: string) {
    await this.service.deleteUser(id);
  }
  async listUsers() {
    return await this.service.listUsers();
  }
}
