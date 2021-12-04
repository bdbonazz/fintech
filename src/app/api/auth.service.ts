import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, switchMap, switchMapTo, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserStore } from '../core/guards/user.store';
import { Credentials, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private userStore: UserStore) {
    this.http.get<void>(`${environment.apiUrl}/csrf-token`).subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(environment.apiUrl + '/login', { email, password}).pipe(
      switchMapTo(this.fetchUser(false)),
      mapTo(true),
      catchError(() => of(false))
    );
  }

  register(credentials: Credentials): Observable<boolean>{
    return this.http.post<boolean>(environment.apiUrl + '/register', credentials);
  }

  logout(): void{
    this.http.get(environment.apiUrl + '/logout')
    this.userStore.removeUser();
    this.router.navigateByUrl('/login');
  }

  fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`${environment.apiUrl}/me`, {}).pipe(
            tap(u => this.userStore.setUser(u))
          );
      })
    );
  }
}
