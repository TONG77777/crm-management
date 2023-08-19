import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from '../contacts/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) {}

  getContactsByCompanyId(companyId: number): Observable<Contact[]> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<Contact[]>('http://localhost:3000/contacts', { params });
  }

  addContactByCompanyId(companyId: number, newContact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`http://localhost:3000/contacts?companyId=${companyId}`, newContact);
  }

  deleteContactByCompanyId(contactId: number): Observable<Contact[]> {
    return this.http.delete<Contact[]>(`http://localhost:3000/contacts/${contactId}`);
  }
  
  updateContact(contactId: number, updatedContact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`http://localhost:3000/contacts/${contactId}`, updatedContact);
  }
}
