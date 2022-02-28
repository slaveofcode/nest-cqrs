type Falsy = '' | null | undefined | false;

export class UserEntity {
  // id: number;
  // name: string;
  // birthday: Date;
  // address: string;
  // age: number;

  constructor(
    public id: number | Falsy,
    public name: string,
    public birthday: Date,
    public address: string,
    public age: number,
  ) {}
}
