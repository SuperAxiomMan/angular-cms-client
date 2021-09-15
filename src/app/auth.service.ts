import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'http://localhost:3000/auth';
  isAuthenticated: boolean = false;

  constructor(private httpClient: HttpClient) {}

  login(user: UserModel) {
    this.isAuthenticated = true;
    return this.httpClient.post<UserModel>(`${this.baseUrl}/login`, user);
  }

  logout() {
    this.isAuthenticated = false;
    return this.httpClient.get(`${this.baseUrl}/logout`);
  }
}
