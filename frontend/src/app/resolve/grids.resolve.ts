import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../organization/organization-service';
import {UserStore} from '../user/user.store';

@Injectable()
export class GridsResolver implements Resolve<any> {

  constructor(private organizationService: OrganizationService, public userStore: UserStore) {}

  resolve(route: ActivatedRouteSnapshot) {

    return this.organizationService.get("organizations/"+ this.userStore.user.value.organizationId +"/projects/" + route.params['projectId']+"/labs");
    // return [
    //   {
    //     "grid_id": "416e144d-c0ad-4ccf-921c-ba730aeda1bb",
    //     "grid_name": "analyze",
    //     "description": "analyze ",
    //     "orgId": " 39ba95e6-97bf-4f16-839a-a0b6eae54777 ",
    //     "projectId": "34966c98-6c7d-4fd8-8352-5af104f40a49 ",
    //     "appId": 1,
    //     "created_by": "51",
    //     "updated_by": "51",
    //     "status": null,
    //     "user_id": "51 ",
    //     "createdAt": "2018-06-01 11:32:20",
    //     "updatedAt": "2018-06-01 11:32:20 ",
    //     "gridChilds": []
    //   },
    //   {
    //     "grid_id": "5cd3a7e3-8b8f-4bb2-a57f-9fe66da9e7b0",
    //     "grid_name": "55",
    //     "description": "555 ",
    //     "orgId": " 3d4f1756-2473-4fec-8174-7d65c6380510 ",
    //     "projectId": "34966c98-6c7d-4fd8-8352-5af104f40a49 ",
    //     "appId": 1,
    //     "created_by": "66",
    //     "updated_by": "66",
    //     "status": null,
    //     "user_id": "66 ",
    //     "createdAt": "2018-06-14 10:15:24",
    //     "updatedAt": "2018-06-14 10:15:24 ",
    //     "gridChilds": []
    //   },
    //   {
    //     "grid_id": "a32147b7-e40c-4944-9f6e-a4d14c4df5ad",
    //     "grid_name": "777",
    //     "description": "777 ",
    //     "orgId": " 3d4f1756-2473-4fec-8174-7d65c6380510 ",
    //     "projectId": "34966c98-6c7d-4fd8-8352-5af104f40a49 ",
    //     "appId": 1,
    //     "created_by": "66",
    //     "updated_by": "66",
    //     "status": null,
    //     "user_id": "66 ",
    //     "createdAt": "2018-06-14 10:16:36",
    //     "updatedAt": "2018-06-14 10:16:36 ",
    //     "gridChilds": []
    //   }
    // ];
  }
}