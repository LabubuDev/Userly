import { UserController } from './controllers/UserController';
import { log } from './utils/logger';

async function main() {
  const controller = new UserController();
  try {
    await controller.createUser({ id: '1', name: 'Alice', age: 30, position: 'Developer' });
    await controller.createUser({ id: '2', name: 'Bob', age: 25, position: 'Designer' });
    log('Users created.');
    const users = await controller.listUsers();
    log('All users: ' + JSON.stringify(users));
    const user = await controller.getUser('1');
    log('User 1: ' + JSON.stringify(user));
    await controller.updateUser('1', { age: 31 });
    log('User 1 updated.');
    await controller.deleteUser('2');
    log('User 2 deleted.');
    log('Final users: ' + JSON.stringify(await controller.listUsers()));
  } catch (err: any) {
    log('Error: ' + err.message);
  }
}

main();
