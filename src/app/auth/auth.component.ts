import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserModel } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  user: UserModel = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    console.log('user', this.user);
    this.authService.login(this.user).subscribe(
      (data: object) => this.handleSuccess(data),
      (err: Error) => this.handleError(err)
    );
  }

  handleSuccess(data: object) {
    console.log('logged in', data);
    this.router.navigate(['/admin']);
  }
  handleError(err: Error) {
    console.log('NOT logged in', err);

  }
}
