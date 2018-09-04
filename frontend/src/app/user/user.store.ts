import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {User} from './user';
import {UserService} from './user.service';

@Injectable()
export class UserStore {
  private _user: BehaviorSubject<User>;

  constructor(private userService: UserService) {
    // TODO: better default user
    this._user = new BehaviorSubject({
      email: '',
      firstName: '',
      lastName: '',
      organizationName:'',
      organizationId:'',
      id: -1
    });
    let userJson:any, user:User;
    userJson = localStorage.getItem('loggedUser');
    if(userJson) {
      try {
        user = JSON.parse(userJson);
        this.setUser(user);
      }
      catch(e) {
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('loggedUser');
        window.location.href = '/';
      }
      
    }
    // this.userService.getUser().subscribe(user => {
    //   if (user) {
    //     this.setUser(user);
    //   }
    // });
  }

  get user(): BehaviorSubject<User> {
    return this._user;
  }

  setUser(user: any): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.user.next(user);
  }
}
