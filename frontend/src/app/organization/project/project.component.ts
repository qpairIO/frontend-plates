import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization-service';
import { Router, ActivatedRoute, ParamMap, RoutesRecognized } from '@angular/router';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { GlobalSettings } from '../../service/data.shared';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public projects:Array<Object>;

  constructor(public OrganizationService: OrganizationService, public toastr: ToastrService, public router:Router, private route: ActivatedRoute, public globalSettings:GlobalSettings) {
  
   }

  ngOnInit() {
    this.projects = this.route.snapshot.data['projects'].rows || [];
  }

  public createProject = function(){
    this.router.navigate(['/project/new']);
  }

  public viewProject = function(projectId){
    this.globalSettings.updateValue({isShowMenu: true });
    this.router.navigate(['/project', projectId]);
  }

}
