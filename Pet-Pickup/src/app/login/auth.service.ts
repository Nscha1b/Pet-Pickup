import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenTimer: any;
  private token: string;
  accountCreated = false;
  isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private accountCreatedListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  createUser(username: string, password: string) {
    const newUser: User = {
      username: username,
      password: password
    };

    this.http
      .post<{ accountCreated: boolean }>(
        'http://localhost:3000/api/signup',
        newUser
      )
      .subscribe(res => {
        console.log(res);
        console.log('test' + res.accountCreated);
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

    this.http
      .post<{ token: string; expiresIn: number }>(
        'http://localhost:3000/api/login',
        user
      )
      .subscribe(res => {
        const token = res.token;
        this.token = token;
        if (token) {
          const expiresInDuration = res.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/dashboard']);
        }
      });
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }


  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  getToken() {
    return this.token;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuth() {
    return this.isAuthenticated;
  }

  getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

}
