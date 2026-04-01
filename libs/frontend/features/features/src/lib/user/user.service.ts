import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IUser, ICreateUser } from '@avans-nx-workshop/shared/api';
import { environment } from '@avans-nx-workshop/shared/util-env';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  gender: string;
  profileImgUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.dataApiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ results: User[] }>(`${this.apiUrl}/users`).pipe(
      map(response => response.results)
    );
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<{ results: User }>(`${this.apiUrl}/users/${id}`).pipe(
      map(response => response.results)
    );
  }

  updateUser(id: string, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, payload);
  }
  
  createUser(user: ICreateUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.apiUrl}/users`, user);
  }
}