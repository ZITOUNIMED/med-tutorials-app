import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../shared/service/auth.service';
import {SignUpRequest} from '../shared/model/signup.request.model';
import {NotificationsState} from '../../shared/notification/notifications.state';
import {Store} from '@ngrx/store';
import {NotificationsAddAction} from '../../shared/notification/notifications.actions';
import {NotificationTypes} from '../../shared/notification/notification.model';
import {RegistrationRule} from '../shared/model/registration-rule.model';
import {AppStoreService} from '../../shared/service/app.store.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  rules: RegistrationRule[];

  constructor(private authService: AuthService,
              private store: Store<NotificationsState>,
              private appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(),
      username: new FormControl(''),
      password: new FormControl(''),
      passwordConfirm: new FormControl(''),
      email: new FormControl(''),
    });
    this.authService.getRegistrationRules().subscribe(rules => {
      this.rules = rules || [];
    });
  }

  signup() {
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const username = this.signupForm.get('username').value;
    const password = this.signupForm.get('password').value;
    const passwordConfirm = this.signupForm.get('passwordConfirm').value;
    const email = this.signupForm.get('email').value;

    const request: SignUpRequest = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      passwordConfirm: passwordConfirm,
      email: email
    };

    this.appStoreService.startLoading();

    this.authService.signUp(request).subscribe(
      res => {
        this.appStoreService.stopLoading();
        this.store.dispatch(new NotificationsAddAction({
          code: null,
          type: NotificationTypes.SUCCESS,
          message: 'User has been registred with success'
        }));
        this.signupForm.reset();
      },
      error => {
        this.appStoreService.stopLoading();
        this.appStoreService.addErrorNotif(error.status, error.error);
      });
  }
}
