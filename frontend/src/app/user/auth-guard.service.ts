import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {LoginService} from './login.service';
import {UserStore} from './user.store';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private loginService: LoginService, private userStore: UserStore) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.isAllowedOnState(state.url, route.data);
  }

  isAllowedOnState(url: string, data:any): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const forbiddenWhenLoggedOut = [
        '/dashboard', 
        '/profile', 
        '/cost-analysis', 
        '/calibration', 
        '/usage-model-analysis', 
        '/ha-testing',
        '/risk-analysis',
        '/release-comparisions',
        '/create-organization'
       ];
      const forbiddenWhenLoggedIn = ['/login', '/signup', '/'];
      const isLoggedIn = this.loginService.loggedIn();

      if (isLoggedIn && forbiddenWhenLoggedIn.indexOf(url) > -1) {
        this.router.navigate(['/dashboard']);
        return resolve(false);
      } else if (!isLoggedIn && (forbiddenWhenLoggedOut.indexOf(url) > -1 || data.authGuard)) {
        this.router.navigate(['/']);
        return resolve(false);
      } else {
        this.userStore.user.subscribe(user => {
          if(isLoggedIn && !user.organizationId && url !== '/create-organization') {
            this.router.navigate(['/create-organization']);
            return resolve(false);
          } else if(isLoggedIn && user.organizationId && url === '/create-organization') {
            this.router.navigate(['/dashboard']);
            return resolve(false);
          }
          return resolve(true);
        });
      }
    });
  }
}
