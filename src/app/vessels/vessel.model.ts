export class Vessel {
  constructor(
    public id: number,
    public companyId: number,
    public vesselName: string,
    public code: string,
    public ip_add: string,
    public connection: string,
    public vpn: string,
    public notes: string
  ) {}
}
