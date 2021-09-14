import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  baseUrl: string = 'http://localhost:3000/auth';

  login(user: UserModel) {
    return this.httpClient.post<UserModel[]>(`${this.baseUrl}/login`, user);
  }
}
