import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) {}

  addTax(tax: any): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/taxes', tax);
  }
}
