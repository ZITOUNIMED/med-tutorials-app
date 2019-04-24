import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {SignInRequest} from '../shared/model/signin.request.model';
import {AuthService} from '../shared/service/auth.service';
import {Store} from '@ngrx/store';
import {PrincipalSaveAction} from '../shared/principal.actions';
import {Principal} from '../shared/model/principal.model';
import {Router} from '@angular/router';
import {AppState} from '../../shared/app.state';
import {StartLoadingAction, StopLoadingAction} from '../../shared/loading.actions';
import {NotificationsAddAction} from '../../shared/notification/notifications.actions';
import { NotificationTypes} from '../../shared/notification/notification.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  principal: Principal;

  loginForm: FormGroup;

  constructor(private authService: AuthService,
              private store: Store<AppState>,
              private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });

    this.store.select('principalState').subscribe(state => {
      if (state && state.principal && state.principal.token) {
        this.router.navigate(['/home']);
      }
    });
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    const signInRequest: SignInRequest = {
      username: username,
      password: password
    };

    this.store.dispatch(new StartLoadingAction());
    this.authService.signIn(signInRequest).subscribe(res => {
      this.store.dispatch(new PrincipalSaveAction(res));
    }, error => {
      this.store.dispatch(new NotificationsAddAction({
        code: error.status,
        type: NotificationTypes.ERROR,
        message: error.message
      }));
      this.store.dispatch(new StopLoadingAction());
    });
  }

}
