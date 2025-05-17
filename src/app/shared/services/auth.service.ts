import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAIN_URL } from '../constants/app';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${MAIN_URL}/auth/login`, credentials);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${MAIN_URL}/auth/logout`, {});
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${MAIN_URL}/auth/register`, data);
  }
}
