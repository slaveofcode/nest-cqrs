import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entity/user.entity';
import { UserCreatedEvent } from 'src/users/events/impl/user-created.event';
import { UsersChangedEvent } from 'src/users/events/impl/users-changed.event';
import { UsersService } from 'src/users/users.service';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private userService: UsersService, private eventBus: EventBus) {}

  async execute(command: CreateUserCommand): Promise<any> {
    try {
      const newUser = await this.userService.saveNew(
        new UserEntity(
          null,
          command.name,
          command.birthday,
          command.address,
          command.age,
        ),
      );

      console.info('New User:', newUser);

      // publish event
      this.eventBus.publishAll([
        new UserCreatedEvent(
          newUser.id as number,
          newUser.birthday,
          newUser.age,
        ),
        new UsersChangedEvent(),
      ]);
    } catch (err) {
      console.error('New User Creation failed:', err);
    }
  }
}
