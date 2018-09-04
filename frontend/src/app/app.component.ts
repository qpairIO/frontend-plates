import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { GlobalSettings } from '../app/service/data.shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [GlobalSettings],
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isBorderlessPage: boolean;
  public class:string;
  isHide: boolean;
  hideMenuList: boolean;
  hideURls: string[] = ['', '/', '/login', '/register'];
  hideMenuUrls: string[] = ['/create-organization'];
  constructor(router: Router, route: ActivatedRoute, public globalSettings:GlobalSettings ) {
    const handleRouteChange = () => {
      router.events.subscribe(newRoute => {
        if (newRoute instanceof NavigationEnd) {
          if(this.hideURls.indexOf(newRoute.url) !== -1){
            this.isHide = true;
          }else{
            this.isHide = false;
          }
          if(this.hideMenuUrls.indexOf(newRoute.url) !== -1) {
            this.hideMenuList = true;
          } else {
            this.hideMenuList = false;
          }
          // Decide which pages get a border and which not
          const borderlessPages = ['/'];
          this.isBorderlessPage = borderlessPages.indexOf(newRoute.urlAfterRedirects) > -1;
        }
      });
    };
    handleRouteChange();
    
    
  }

  ngOnInit() {
    this.globalSettings.globalValue$.subscribe(newValue => {
      if(newValue && newValue.isShowMenu){
        this.class = 'closed';
      }else{
        this.class = '';
      }
    });
  }

  
}
