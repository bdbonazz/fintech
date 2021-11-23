import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(environment.apiUrl + '/contacts');
  }

  addContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.post<Contact>(environment.apiUrl + '/contacts', contact);
  }

  patchContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(environment.apiUrl + '/contacts/' + contact._id, contact);
  }

  deleteContact(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(environment.apiUrl + '/contacts/' + _id);
  }
}
