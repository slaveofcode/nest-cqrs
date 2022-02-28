import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UsersChangedEvent } from '../impl/users-changed.event';

@EventsHandler(UsersChangedEvent)
export class UsersChangedHandler implements IEventHandler<UsersChangedEvent> {
  handle(event: UsersChangedEvent) {
    console.info('event: users list changed', event);
  }
}
