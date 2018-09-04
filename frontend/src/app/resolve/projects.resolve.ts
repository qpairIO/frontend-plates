import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../organization/organization-service';
import {UserStore} from '../user/user.store';
import { Http } from '@angular/http';

@Injectable()
export class ProjectsResolver implements Resolve<any> {

  constructor(private organizationService: OrganizationService, public userStore: UserStore, public http:Http) {}

  resolve(route: ActivatedRouteSnapshot): Promise<any>|any  {
    return this.organizationService.getProjects("organizations/"+ this.userStore.user.value.organizationId +"/projects");
  }
}