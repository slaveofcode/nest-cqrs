export class UserCreatedEvent {
  constructor(
    private id: number,
    private birthday: Date,
    private age: number,
  ) {}
}
