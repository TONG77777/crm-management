export class Contact {
  constructor(
    public id: number,
    public companyId: number,
    public contactName: string,
    public title: string,
    public email: string,
    public phone: string,
    public notes: string
  ) {}
}
