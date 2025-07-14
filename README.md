# User Management System

A modular TypeScript project for managing users with file-based JSON storage. The system is designed for extensibility, testability, and clean separation of concerns.

## Features
- Add, update, delete, and list users
- Data validation and error handling
- Pluggable storage (JSON file by default)
- Layered architecture (Controller, Service, Storage)
- Simple logging utility

## Project Structure

```
src/
  User.ts                  # User interface/type definition
  UserManager.ts           # (Legacy) User management logic
  validators/
    UserValidator.ts       # User data validation logic
  errors/
    UserError.ts           # Custom error classes
  storage/
    FileStorage.ts         # Abstract file storage
    JsonUserStorage.ts     # JSON file storage implementation
  services/
    UserService.ts         # Business logic for user operations
  controllers/
    UserController.ts      # Controller for user operations
  utils/
    logger.ts              # Simple logger utility
  index.ts                 # Entry point (example usage)
```

## Usage Example

Run the example script:

```bash
pnpm install
pnpm ts-node src/index.ts
```

Example output:
```
[2025-07-14T12:00:00.000Z] Users created.
[2025-07-14T12:00:00.000Z] All users: [{"id":"1","name":"Alice","age":30,"position":"Developer"}, ...]
[2025-07-14T12:00:00.000Z] User 1: {"id":"1","name":"Alice","age":30,"position":"Developer"}
[2025-07-14T12:00:00.000Z] User 1 updated.
[2025-07-14T12:00:00.000Z] User 2 deleted.
[2025-07-14T12:00:00.000Z] Final users: [{"id":"1","name":"Alice","age":31,"position":"Developer"}]
```

## API Overview

### User Interface
```
interface User {
  id: string;
  name: string;
  age: number;
  position: string;
}
```

### Main Classes
- `UserController` – High-level API for user operations
- `UserService` – Business logic and validation
- `JsonUserStorage` – File-based storage
- `UserValidator` – Data validation
- `UserError` – Custom error for user operations

### Example: Adding a User
```typescript
import { UserController } from './controllers/UserController';
const controller = new UserController();
await controller.createUser({ id: '3', name: 'Eve', age: 22, position: 'QA' });
```

## Extending the System
- Add new storage backends by extending `FileStorage<T>`
- Add new validation rules in `UserValidator`
- Integrate with a web server or CLI via `UserController`

## Development
- Written in TypeScript
- Modular and testable
- Easily extensible for new features

## License
MIT
