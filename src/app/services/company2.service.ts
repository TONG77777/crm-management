import { Injectable } from '@angular/core';
import { Company } from '../companys/company.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Company2Service {

  private companys: Company[] ;

  constructor(private http: HttpClient) {}

  getCompanyList(): Observable<any> {
    return this.http.get(`http://localhost:3000/companys`);
  }

  addCompany(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/companys`, data);
  }

  deleteCompany(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/companys/${id}`);
  }

  updateCompany(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/companys/${id}`, data);
  }

}
