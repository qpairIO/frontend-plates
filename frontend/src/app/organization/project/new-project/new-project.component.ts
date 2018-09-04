import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../organization-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {UserStore} from '../../../user/user.store';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  public project:any;
  public isSaving:boolean;

  constructor(public OrganizationService: OrganizationService, public toastr: ToastrService, public router:Router, public userStore:UserStore) {
    //this.project = {"name":"","description":"","testFolder":"null","aws_profile":"null","aws_access_key_id":"null","aws_secret_access_key":"null","aws_region":"null","status":"enabled","orgId":"3d4f1756-2473-4fec-8174-7d65c6380510","appId":1,"created_by":"66","updated_by":"66","user_id":"66","createdAt":"2018-06-14 09:25:52","updateAt":"2018-06-14 09:25:52"};
    this.project = {name: "", description:""}
  }

  ngOnInit() {
    
  }

  public save =  function(){
    this.isSaving = true;
    var self = this;
    this.userStore.user.subscribe(user => {
      self.OrganizationService.createProject("organizations/"+ user.organizationId +"/projects", self.project).subscribe(project => {
        self.isSaving = false;
        self.toastr.success('Created Project');
        self.router.navigate(['/project']);
      });
    });
   
  }

  public back = function(){
    this.router.navigate(['/project']);
  }


}

