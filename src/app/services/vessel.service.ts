import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Vessel } from '../vessels/vessel.model';
Vessel

@Injectable({
  providedIn: 'root'
})
export class VesselService {

  constructor(private http: HttpClient) {}

  getVesselsByCompanyId(companyId: number): Observable<Vessel[]> {
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<Vessel[]>('http://localhost:3000/vessels', { params });
  }

  addVesselsByCompanyId(companyId: number, newVessel: Vessel): Observable<Vessel> {
    return this.http.post<Vessel>(`http://localhost:3000/vessels?companyId=${companyId}`, newVessel);
  }

  deleteVesselsByCompanyId(vesselId: number): Observable<Vessel[]> {
    return this.http.delete<Vessel[]>(`http://localhost:3000/vessels/${vesselId}`);
  }
  
  updateVessels(vesselId: number, updatedVessel: Vessel): Observable<Vessel> {
    return this.http.put<Vessel>(`http://localhost:3000/vessels/${vesselId}`, updatedVessel);
  }

}
