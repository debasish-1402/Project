export default class Todo {
  constructor(
    public id: number,
    public text: string,
    public completed: boolean = false
  ) {}
}
