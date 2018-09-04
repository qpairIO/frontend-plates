import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../organization/organization-service';

@Injectable()
export class GridResolver implements Resolve<any> {

  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {
     //this.OrganizationService.getGrids(route.paramMap.get('projectId')).subscribe(grids => {
        //this.grids = grids;
        //http://localhost:1337/api/v1/projects/34966c98-6c7d-4fd8-8352-5af104f40a49/grids
        //hardcode to test
        //this.grids = this.route.snapshot.data['grids'] || [];
        //console.log(this.grids)
      //});
 
    return {
      "grid_id": "416e144d-c0ad-4ccf-921c-ba730aeda1bb",
      "grid_name": "analyze",
      "description": "analyze ",
      "orgId": " 39ba95e6-97bf-4f16-839a-a0b6eae54777 ",
      "projectId": "34966c98-6c7d-4fd8-8352-5af104f40a49 ",
      "appId": 1,
      "created_by": "51",
      "updated_by": "51",
      "status": null,
      "user_id": "51 ",
      "createdAt": "2018-06-01 11:32:20",
      "updatedAt": "2018-06-01 11:32:20 ",
      "gridChilds": []
    };
  }
}