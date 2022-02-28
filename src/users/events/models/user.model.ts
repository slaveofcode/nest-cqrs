import { AggregateRoot } from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entity/user.entity';
import { UserCreatedEvent } from '../impl/user-created.event';

export class UserEventModel extends AggregateRoot {
  constructor() {
    super();
  }

  onCreated(user: UserEntity) {
    this.apply(
      new UserCreatedEvent(user.id as number, user.birthday, user.age),
    );
  }
}
