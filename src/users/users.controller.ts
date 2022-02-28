import { v5 as uuidv5 } from 'uuid';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus, EventPublisher } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUserByIdQuery } from './queries/impl/get-user-by-id.query';
import { GetUsersQuery } from './queries/impl/get-users.query';

const UUID_NS = '6b8130e7-d570-4727-9f1e-acc028202e96';
let eventStoreId = 1;

@Controller('users')
export class UsersController {
  constructor(
    private queryBus: QueryBus,
    private commandBus: CommandBus,
    private eventPub: EventPublisher,
  ) {}

  @Get()
  async allUsers() {
    return await this.queryBus.execute(new GetUsersQuery());
  }

  @Get('/:id')
  async byId(@Param('id') id: string) {
    const user = await this.queryBus.execute(new GetUserByIdQuery(Number(id)));

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  // these implementation could use DTO, the example is just for simplicity
  @Post('/')
  async createuser(@Body() body: any) {
    const { name, birthday, age, address } = body;

    // Validation
    // Transaction / Distributed Concurrency Control e.g. Item Stock Amount

    // Recording event ~> event GUID
    const eventGUID = uuidv5(`USER:CREATE:${eventStoreId++}`, UUID_NS);

    await this.commandBus.execute(
      new CreateUserCommand(name, new Date(birthday), address, age),
    );

    return {
      eid: eventGUID,
      callbackURL: `http://localhost:3000/users/check/${eventGUID}`,
    };
  }

  // these implementation could use DTO, the example is just for simplicity
  @Post('/via-class') // required: class-transformer & class-validator
  @UsePipes(new ValidationPipe({ transform: true }))
  async createuser_(@Body() command: CreateUserCommand) {
    // Validation
    // Transaction / Distributed Concurrency Control e.g. Item Stock Amount

    // Recording event ~> event GUID
    const eventGUID = uuidv5(`USER:CREATE:${eventStoreId++}`, UUID_NS);

    await this.commandBus.execute(command);

    return {
      eid: eventGUID,
      callbackURL: `http://localhost:3000/users/check/${eventGUID}`,
    };
  }
}
