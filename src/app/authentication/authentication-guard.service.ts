import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PrincipalState} from './shared/principal.state';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<PrincipalState>) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.select('principalState')
      .subscribe(state => {
        if(!state || !state.principal || !state.principal.token) {
          this.router.navigate(['/auth/login']);
        }
      });
    return true;
  }
}
