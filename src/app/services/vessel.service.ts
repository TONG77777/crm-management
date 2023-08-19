import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  constructor(private http: HttpClient) {}

  getContactList(): Observable<any> {
    return this.http.get(`http://localhost:3000/vessels`);
  }

  addVessel(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/vessels`, data);
  }

  deleteVessel(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/vessels/${id}`);
  }

  updateVessel(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/vessels/${id}`, data);
  }

}
