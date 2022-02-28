import { EventBus, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersFetchedEvent } from 'src/users/events/impl/users-fetched.event';
import { UsersService } from 'src/users/users.service';
import { GetUsersQuery } from '../impl/get-users.query';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery> {
  constructor(
    private readonly userService: UsersService,
    private readonly eventBus: EventBus,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(query: GetUsersQuery): Promise<UserEntity[]> {
    const users = await this.userService.getAll();

    const userIds = new UsersFetchedEvent(
      users.map((item) => {
        return item.id as number;
      }),
    );

    this.eventBus.publish(userIds);

    return users;
  }
}
