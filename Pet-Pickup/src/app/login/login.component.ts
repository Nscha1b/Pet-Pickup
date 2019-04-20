import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';
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
  toastText: string;
  private timer: Observable<any>;
  accountCreated = null;
  private accountCreatedSub: Subscription;

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    this.accountCreatedSub = this.authService.getAccountCreatedListener().subscribe(userCreated => {
      this.accountCreated = userCreated;
      if (this.accountCreated) {
        this.changeForm();
        this.showToast('Account created! Please login.');
      } else if (this.accountCreated === false) {
        this.showToast('Unable to create account, please try again.');
      }
    });
  }

  onLogIn(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.authService.login(form.value.unInput, form.value.pwInput);
  }

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.createUser(form.value.unInput, form.value.pwInput);
  }

  changeForm() {
    this.login = !this.login;
  }

  public showToast(message: string) {
    this.toast = true;
    this.timer = timer(2000);
    this.toastText = message;
    this.timer.subscribe(() => {
        this.toast = false;
    });
  }


}
