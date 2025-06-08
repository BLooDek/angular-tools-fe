import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAIN_URL } from '../constants/app';
import { LoginRequest, LoginResponse } from '../models/auth.interface';

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

  register(data: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${MAIN_URL}/auth/register`, data);
  }

  checkToken(): Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`${MAIN_URL}/auth/check-token`);
  }
}
