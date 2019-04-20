import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/service/user.service';
import { User } from './shared/model/user.model';
import { CreateUpdateUserComponent } from './shared/modal/create-update-user/create-update-user.component';
import { MatDialog } from '@angular/material';
import { RoleNameTypes } from './shared/model/role-name-types.enum';
import { Store } from '@ngrx/store';
import { LoadingState } from '../shared/loading.state';
import { StartLoadingAction, StopLoadingAction } from '../shared/loading.actions';
import { GenerecDialogComponent } from '../generec-dialog/generec-dialog.component';

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
    private store: Store<LoadingState>) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(new StartLoadingAction());
    this.userService.getAllUsers()
      .subscribe(users => {
        this.users = users;
      },
        () => { },
        () => {
          this.store.dispatch(new StopLoadingAction());
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
    this.store.dispatch(new StartLoadingAction());
    this.userService.saveUser(user)
      .subscribe((res: any) => {
        this.store.dispatch(new StopLoadingAction());
        this.loadUsers();
      },
        () => {
          this.store.dispatch(new StopLoadingAction());
        });
  }

  deleteUser(id: number) {
    this.store.dispatch(new StartLoadingAction());
    this.userService.deleteUser(id)
      .subscribe((res: any) => {
        this.store.dispatch(new StopLoadingAction());
        this.loadUsers();
      },
        () => {
          this.store.dispatch(new StopLoadingAction());
        });
  }
}
