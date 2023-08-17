export class Contact {
  constructor(
    public contactId: number,
    public contactName: string,
    public title: string,
    public email: string,
    public phone: string,
    public notes: string
  ) {}
}
