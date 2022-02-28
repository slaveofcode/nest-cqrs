import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';

const DummyUsersData = [
  new UserEntity(1, 'John', new Date(), 'Bekasi', 25),
  new UserEntity(2, 'Doe', new Date(), 'Bekasi', 25),
  new UserEntity(3, 'Christy', new Date(), 'Bekasi', 25),
  new UserEntity(4, 'Umam', new Date(), 'Bekasi', 25),
  new UserEntity(5, 'Smith', new Date(), 'Bekasi', 25),
];

let LAST_ID_STATE = 5;

@Injectable()
export class UsersService {
  //   constructor(
  //       private readonly userRepository: UserRepository,
  //   ) {}

  async getAll(): Promise<UserEntity[]> {
    return DummyUsersData;
  }

  async getById(id: number): Promise<UserEntity> {
    return DummyUsersData.find((item) => item.id === id);
  }

  async saveNew(user: UserEntity): Promise<UserEntity> {
    const newUser = new UserEntity(
      ++LAST_ID_STATE,
      user.name,
      user.birthday,
      user.address,
      user.age,
    );

    DummyUsersData.push(newUser);

    return newUser;
  }
}
