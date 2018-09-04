import {Component, OnInit} from '@angular/core';

import {LoginService} from '../user/login.service';
import {User} from '../user/user';
import {UserStore} from '../user/user.store';
import { GlobalSettings } from '../service/data.shared';
@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  user: User;
  public isShowMenu:boolean;
  public class:string;
  constructor(
    private loginService: LoginService,
    private userStore: UserStore,
    public globalSettings:GlobalSettings
  ) {}

  loggedIn(): boolean {
    return this.loginService.loggedIn();
  }

  logOut() {
    this.loginService.logOut();
  }

  ngOnInit() {
    this.userStore.user.subscribe(user => {
      this.user = user
    });
    this.globalSettings.globalValue$.subscribe(newValue => {
      if(newValue && newValue.isShowMenu){
        this.class = 'active';
      }else{
        this.class = '';
      }
    });
  }

  public hideMenu = function(){
    if(this.isShowMenu){
      this.class="active";
    }else{
      this.class="";
    }
    this.globalSettings.updateValue({isShowMenu: this.isShowMenu });
  }
}
