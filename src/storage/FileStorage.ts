export abstract class FileStorage<T> {
  protected filePath: string;
  constructor(filePath: string) {
    this.filePath = filePath;
  }
  abstract read(): Promise<T[]>;
  abstract write(data: T[]): Promise<void>;
}
