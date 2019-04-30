import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {AppStoreService} from '../shared/service/app.store.service';

@Directive({
  selector: '[appPermissions]'
})
export class AppPermissionsDirective implements OnInit {

  @Input() appPermissions: { roles: string[], permissions: string[] };

  constructor(private el: ElementRef, private appStoreService: AppStoreService) {
  }

  ngOnInit() {
    this.appStoreService.getUserPermissions()
      .subscribe((userPermissions: { roles: string [], permissions: string[] }) => {
        if (userPermissions &&
          userPermissions.roles
          && this.appPermissions
          && this.appPermissions.roles
          && this.appPermissions.roles.length) {
          this.appPermissions.roles.forEach(role => {
            if (userPermissions.roles.every(r => r !== role)) {
              this.el.nativeElement.remove();
              return;
            }
          });
        }
      });
  }
}
