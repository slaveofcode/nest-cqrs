import { UserCreatedHandler } from './user-created.handler';
import { UsersFetchedHandler } from './users-fetched.handler';
import { UsersChangedHandler } from './users-changed.handler';

export const EventHandlers = [
  UserCreatedHandler,
  UsersFetchedHandler,
  UsersChangedHandler,
];
