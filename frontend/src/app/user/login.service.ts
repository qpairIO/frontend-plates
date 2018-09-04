import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotifyService} from '@tsmean/toast';

import {ApiUrl} from './api-url';
import {TokenStorage} from './token.storage';
import {UserStore} from './user.store';
import {AnimalListDashboardListStore} from '../animal-list/animal-list-dashboard-list.store';
import {catchError, map} from 'rxjs/operators';

declare var gapi: any;

@Injectable()
export class LoginService {
  private isLoggedIn = false;

  constructor(
    @Inject(ApiUrl) private apiUrl: string,
    private tokenStorage: TokenStorage,
    private http: HttpClient,
    private notifyService: NotifyService,
    private userStore: UserStore,
    private router: Router,
    private dashboardLists: AnimalListDashboardListStore
  ) {
    this.isLoggedIn = tokenStorage.token !== undefined;
  }

  logIn(email: string, password: string): void {
    this.http
      .post(this.loginApi, {email: email, passwd: password})
      .pipe(
        map((resp: any) => resp),
        catchError(this.handleError)
      )
      .subscribe((resp: any) => this.doLogin(resp));
  }

  googleLogin(): void {
    gapi.auth2.getAuthInstance().signIn().then(
      (resp:any) => this.googleConnect(resp),
      (error:any) => this.handleError(error)
    );
  }

  googleConnect(googleData):void {
    let data = googleData.getAuthResponse();
    this.http.post(this.loginGoogleApi, { accessToken:  data.access_token })
    .pipe(
      map((resp: any) => resp),
      catchError(this.handleError)
    )
    .subscribe((resp: any) => this.doLogin(resp));
  }

  doLogin(data:any): void {
    this.isLoggedIn = true;
    this.tokenStorage.set(data.token);
    this.userStore.setUser(data.user);
    this.notifyService.success('logged in');
    window.location.reload();
  }

  logOut(): void {
    this.isLoggedIn = false;
    this.tokenStorage.clear();
    this.dashboardLists.setCurrent(1);
    this.router.navigate(['/']);
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  private get loginGoogleApi(): string {
    return [this.apiUrl, 'connect', 'google'].join('/');
  }

  private get loginApi(): string {
    return this.apiUrl + '/login';
  }

  private handleError = (errorResp: any): Promise<any> => {
    const error = errorResp.error ? errorResp.error.message : errorResp.statusText || 'An error ocurred';
    this.notifyService.error('An error ocurred');
    return Promise.reject(error);
  }

}
