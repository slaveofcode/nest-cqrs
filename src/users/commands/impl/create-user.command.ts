export class CreateUserCommand {
  constructor(
    public name: string,
    public birthday: Date,
    public address: string,
    public age: number,
  ) {}
}
