import { Contact } from "../contacts/contact.model";
import { Vessel } from "../vessels/vessel.model";

export class Company {
    constructor(
      public id: number,
      public name: string,
      public priority: string,
      public date: string,
      public notes: string, 
      public contacts: Contact[],
      public vessels: Vessel[]
    ) {}
  }
  