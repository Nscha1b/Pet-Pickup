import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private response;
  constructor(private http: HttpClient) { }

 createUser(username: string, password: string) {
    const newUser: User = {
      username: username,
      password: password
    };

    this.http.post('http://localhost:3000/api/signup', newUser)
        .subscribe((res) => {
          console.log(res);
          this.response = res;
        });
  }




}
