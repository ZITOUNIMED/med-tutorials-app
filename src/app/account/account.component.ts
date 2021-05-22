import { Component, OnInit } from '@angular/core';
import {UserService} from '../user/shared/service/user.service';
import {User} from '../user/shared/model/user.model';
import {Store} from '@ngrx/store';
import { AppStoreService } from '../shared/service/app.store.service';
import { UserSaveAction } from '../user/shared/user.actions';
import {AppState} from '../shared/app.state';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  editMode=false;
  user: User;
  userForm: FormGroup;
  infos = '';
  constructor(private userService: UserService,
              private store: Store<AppState>,
              private appStoreService: AppStoreService) { }

  ngOnInit() {
    const fb = new FormBuilder();
    this.userForm = fb.group({
      firstname: [],
      lastname: [],
      email: [],
      password: [],
      confirmPassword: []
    });

    this.store.select('principalState').subscribe(state => {
      if (state && state.principal && state.principal.username) {
        this.loadUser(state.principal.username);
      }
    });
  }

  saveUser(){

  }

  displayInfos(key){
    this.infos = '';
    if(key === 'ROLE_USER'){
      this.infos = 'This role is limited to the management of documents (creation, reading, deleting and editing of your own dowuments).'
    }
  }

  loadUser(username: string) {
    this.appStoreService.startLoading();
    this.userService.findByUsername(username)
      .subscribe(user => {
        this.user = user;
        this.initUserForm();
        this.store.dispatch(new UserSaveAction(user));
      }, error => {
        this.appStoreService.addErrorNotif(error.status, error.message);
      }, () => {
        this.appStoreService.stopLoading();
      });
  }

  private initUserForm(){
    this.userForm.get('firstname').patchValue(this.user.firstname);
    this.userForm.get('lastname').patchValue(this.user.lastname);
    this.userForm.get('email').patchValue(this.user.email);
  }

}
