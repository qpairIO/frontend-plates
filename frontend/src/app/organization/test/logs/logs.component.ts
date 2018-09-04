import { Component, OnInit } from '@angular/core';
import { GlobalSettings } from '../../../service/data.shared';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrganizationService } from '../../organization-service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  public global:any;
  public loadingLogs:boolean = true;
  public isTestResults:boolean = false;
  public grid:any;
  public logs:any;

  constructor(public organizationService: OrganizationService, private globalSettings: GlobalSettings, public sanitizer: DomSanitizer, public toastr: ToastrService, public router: Router, private route: ActivatedRoute) { 
    this.globalSettings.globalValue$.subscribe(newValue => {
      if(newValue.grid && newValue.grid.grid_name){
        this.grid = newValue.grid;
      }
    });
  }

  ngOnInit() {
    let data = this.globalSettings.getValue();
    if(!data || !data.grid){
      setTimeout(() => {
        this.toastr.error('Please select lab first.');
        this.router.navigate(['../select-lab'], {relativeTo: this.route});
      });
      return;
    }
  var self = this;
  var interval = setInterval(function () {
    if (!data.grid) {
      clearInterval(interval)
      return;
    }

    var gridName = data.grid.grid_name.replace(/[^a-zA-Z0-9]/g, '');
    //var apiUrl = 'http://nodeapi.deploybytes.com/api/v0/getGridPodLogs/';
    //var apiUrl = 'https://s3.amazonaws.com/loadswarmjmx/fluentd';
    self.organizationService.getLogs(self.isTestResults, gridName).subscribe(logs => {
      self.logs = logs;
      self.loadingLogs = false;
    }, err => {self.loadingLogs = false});

  }, 4000);
  } 

}
