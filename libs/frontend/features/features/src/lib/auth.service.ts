import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUserIdentity, ICreateUser } from '@avans-nx-workshop/shared/api'; // Voeg het IUserIdentity-model toe
import { environment } from '@avans-nx-workshop/shared/util-env';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.dataApiUrl;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  register(user: ICreateUser): Observable<IUserIdentity> {
    return this.http.post<IUserIdentity>(`${this.apiUrl}/auth/register`, user);
  }

  login(credentials: { email: string; password: string }): Observable<IUserIdentity> {
    return this.http.post<{ results: IUserIdentity; info: any }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap((response) => {
        localStorage.setItem(this.tokenKey, response.results.token);
        localStorage.setItem('user', JSON.stringify(response.results));
      }),
      map((response) => response.results)
    );
  }

  getCurrentUser(): IUserIdentity | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}