import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../organization/organization-service';
import {UserStore} from '../user/user.store';
import { Http } from '@angular/http';

@Injectable()
export class OrganizationResolver implements Resolve<any> {

  constructor(private organizationService: OrganizationService, public userStore: UserStore, public http:Http) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.organizationService.getOrganization("users/"+ this.userStore.user.value.organizationId +"/organizations");
  }
}