
import { _isNumberValue } from '@angular/cdk/coercion';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DayWithSlot, DayWithSlots, Location } from '../models/location';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(environment.apiUrl + '/locations');
  }

  getSlots(_id: string): Observable<DayWithSlots[]> {
    return this.http.get<DayWithSlots[]>(environment.apiUrl + '/slots/' + _id);
  }

  //Manca il parametro per dire a che location mi sto prenotando
  addAppointment(slot: DayWithSlot): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/schedule/', slot);
  }
}
