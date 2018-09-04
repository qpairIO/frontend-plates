import {Component} from '@angular/core';
import {NotifyService} from '@tsmean/toast';
import {Router} from '@angular/router';

import {LoginService} from '../login.service';
import {UserService} from '../user.service';
import {UserWithoutId} from '../user';
import {UserStore} from '../user.store';

@Component({
  selector: 'app-user-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  newUser: UserWithoutId = {
    email: '',
    firstName: '',
    lastName: '',
    organizationName: '',
    organizationId: ''
  };

  password = '';

  constructor(
    private userService: UserService,
    private notifyService: NotifyService,
    private loginService: LoginService,
    private userStore: UserStore,
    private router: Router
  ) {}

  doSignUp() {
    this.userService.createUser(this.newUser, this.password).subscribe(user => {
      this.notifyService.success('User created');
      this.router.navigate(['/login'])
    });
  }
}
