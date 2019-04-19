import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  login = true;
  toast = false;
  toastText;
  private timer: Observable<any>;

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    console.log(form.value);
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.unInput, form.value.pwInput);
    this.showToast();
  }

  changeForm() {
    this.login = !this.login;
  }

  public showToast() {
    this.toast = true;
    this.timer = timer(2000);
    console.log(this.toastText);
    this.timer.subscribe(() => {
        this.toast = false;
    });
  }


}
