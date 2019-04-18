import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../shared/service/auth.service';
import {SignUpRequest} from '../shared/model/signup.request.model';
import {NotificationsState} from '../../shared/notification/notifications.state';
import {Store} from '@ngrx/store';
import {NotificationsAddAction} from '../../shared/notification/notifications.actions';
import {NotificationTypes} from '../../shared/notification/notification.model';
import {RegistrationRule} from '../shared/model/registration-rule.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  rules: RegistrationRule[];

  constructor(private authService: AuthService,
              private store: Store<NotificationsState>) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl('')
    });
    this.authService.getRegistrationRules().subscribe(rules => {
      this.rules = rules || [];
    });
  }

  signup() {
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    const passwordConfirm = this.signupForm.get('passwordConfirm').value;

    const request: SignUpRequest = {
      username: username,
      password: password,
      passwordConfirm: passwordConfirm
    };

    this.authService.signUp(request).subscribe(
      res => {
        this.store.dispatch(new NotificationsAddAction({
          code: null,
          type: NotificationTypes.SUCCESS,
          message: 'User has been registred with success'
        }));
        this.signupForm.reset();
      },
        error => {
        this.store.dispatch(new NotificationsAddAction({
          code: error.status,
          type: NotificationTypes.ERROR,
          message: error.error
        }));
      });
  }
}
