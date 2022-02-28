import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule],
  providers: [
    UsersService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
