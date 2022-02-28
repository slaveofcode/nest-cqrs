import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserEntity } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { GetUserByIdQuery } from '../impl/get-user-by-id.query';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userService: UsersService) {}

  execute(query: GetUserByIdQuery): Promise<UserEntity> {
    return this.userService.getById(query.id);
  }
}
