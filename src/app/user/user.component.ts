import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/service/user.service';
import { User } from './shared/model/user.model';
import { CreateUpdateUserComponent } from './shared/modal/create-update-user/create-update-user.component';
import { MatDialog } from '@angular/material';
import { RoleNameTypes } from './shared/model/role-name-types.enum';
import { GenerecDialogComponent } from '../generec-dialog/generec-dialog.component';
import {AppStoreService} from '../shared/service/app.store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  RoleNameTypes = RoleNameTypes;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private appStoreService: AppStoreService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.appStoreService.startLoading();
    this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
      },
        () => { },
        () => {
          this.appStoreService.stopLoading();
        });
  }

  openCreateUpdateUser(user: User) {
    const dialogRef = this.dialog.open(CreateUpdateUserComponent, {
      data: {
        user: user
      }
    });
    dialogRef.afterClosed().subscribe((user: User) => {
      if (user) {
        this.saveUser(user);
      }
    });
  }

  openDeleteUser(user: User) {
    const dialogRef = this.dialog.open(GenerecDialogComponent, {
      width: '350px',
      data: { title: 'Delete User', message: 'Do you want to delete the user: ' + user.username + ' ?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(user.id);
      }
    });
  }

  saveUser(user: User) {
    this.appStoreService.startLoading();
    this.userService.saveUser(user)
      .subscribe((res: any) => {
        this.appStoreService.stopLoading();
        this.loadUsers();
      },
        () => {
          this.appStoreService.stopLoading();
        });
  }

  deleteUser(id: number) {
    this.appStoreService.startLoading();
    this.userService.deleteUser(id)
      .subscribe((res: any) => {
          this.appStoreService.stopLoading();
        this.loadUsers();
      },
        () => {
          this.appStoreService.stopLoading();
        });
  }
}
