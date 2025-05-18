import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MAIN_URL } from '../constants/app';
import { RegisterResponse } from '../models/auth.interface';

export interface LoginRequest {
  email: string;
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

  register(data: any): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${MAIN_URL}/auth/register`, data);
  }
}
