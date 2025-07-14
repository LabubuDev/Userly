import * as fs from 'fs/promises';
import * as path from 'path';

interface User {
  id: string;
  name: string;
  age: number;
  position: string;
}

class UserManager {
  private filePath: string;

  constructor(filename = 'users.json') {
    this.filePath = path.resolve(filename);
  }

  private async readFile(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as User[];
    } catch (err) {
      if ((err as any).code === 'ENOENT') {
        // jeśli plik nie istnieje, zwróć pustą tablicę
        return [];
      }
      throw err;
    }
  }

  private async writeFile(users: User[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(users, null, 2));
  }

  async addUser(user: User): Promise<void> {
    const users = await this.readFile();
    if (users.find(u => u.id === user.id)) {
      throw new Error(`Użytkownik z id ${user.id} już istnieje`);
    }
    users.push(user);
    await this.writeFile(users);
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = await this.readFile();
    return users.find(u => u.id === id);
  }

  async updateUser(id: string, data: Partial<User>): Promise<void> {
    const users = await this.readFile();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`Nie znaleziono użytkownika z id ${id}`);
    }
    users[index] = {...users[index], ...data};
    await this.writeFile(users);
  }

  async deleteUser(id: string): Promise<void> {
    let users = await this.readFile();
    users = users.filter(u => u.id !== id);
    await this.writeFile(users);
  }

  async listUsers(): Promise<User[]> {
    return await this.readFile();
  }
}

export default UserManager;
