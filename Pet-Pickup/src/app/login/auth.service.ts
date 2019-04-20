import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private response;
  private token: string;
  accountCreated = false;
  isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private accountCreatedListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

 createUser(username: string, password: string) {
    const newUser: User = {
      username: username,
      password: password
    };

    this.http.post<{accountCreated: boolean}>('http://localhost:3000/api/signup', newUser)
        .subscribe((res) => {
          console.log(res); console.log('test' + res.accountCreated);
          this.accountCreated = res.accountCreated;
          if (this.accountCreated) {
            this.accountCreatedListener.next(true);
          } else {
            this.accountCreatedListener.next(false);
          }
        });
  }

  getAccountCreatedListener() {
    return this.accountCreatedListener.asObservable();
  }

  login(username: string, password: string) {
    const user: User = {
      username: username,
      password: password
    };

    this.http.post<{token: string}>('http://localhost:3000/api/login', user)
        .subscribe((res) => {
          const token = res.token;
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.router.navigate(['/dashboard']);
          }
        });
  }

getToken() {
  return this.token;
}

getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}


logout() {
  this.token = null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  this.router.navigate(['/']);
}


}
