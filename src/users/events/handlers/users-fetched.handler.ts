import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersFetchedEvent } from '../impl/users-fetched.event';

@EventsHandler(UsersFetchedEvent)
export class UsersFetchedHandler implements IEventHandler<UsersFetchedEvent> {
  handle(event: UsersFetchedEvent) {
    console.info('Users fetched, id: ', event.userIds.join(', '));
  }
}
