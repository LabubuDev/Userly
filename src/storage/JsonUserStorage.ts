import { FileStorage } from './FileStorage';
import { User } from '../User';
import * as fs from 'fs/promises';

export class JsonUserStorage extends FileStorage<User> {
  async read(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as User[];
    } catch (err: any) {
      if (err.code === 'ENOENT') return [];
      throw err;
    }
  }
  async write(data: User[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
}
