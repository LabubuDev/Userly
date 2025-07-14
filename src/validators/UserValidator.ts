import { User } from '../User';
import { UserError } from '../errors/UserError';

export class UserValidator {
  static validate(user: User): void {
    if (!user.id || !user.name || typeof user.age !== 'number' || !user.position) {
      throw new UserError('Invalid user data');
    }
    if (user.age < 0 || user.age > 120) {
      throw new UserError('User age must be between 0 and 120');
    }
  }
}
