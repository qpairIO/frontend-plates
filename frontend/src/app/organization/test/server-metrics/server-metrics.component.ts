import { Component, OnInit, Inject, } from '@angular/core';
import { OrganizationService } from '../../organization-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {FormControl} from '@angular/forms';
import { CONSTANT } from '../../../constants/constants.component';
import { GlobalSettings } from '../../../service/data.shared';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';
import {UserStore} from '../../../user/user.store';
//import * as c3 from 'c3';

declare let c3: any;
@Component({
  selector: 'app-server-metrics',
  templateUrl: './server-metrics.component.html',
  styleUrls: ['./server-metrics.component.scss']
})
export class ServerMetricsComponent implements OnInit {

  constructor(public organizationService: OrganizationService, public userStore:UserStore, public globalSettings:GlobalSettings, public toastr: ToastrService, public router:Router, private route: ActivatedRoute, public dialog: MatDialog) { }
  
  public instanceIds:any = ['i-019d18afbe5904dc1', 'i-0000076a007851047fb'];
  public instanceId:any;
  public apiUrl:any;
  public data = {};
  public labels = {};
  public isLoading:any;
  public metricControl:any;
  public metricNames = ['CPUUtilization',
  'DiskReadBytes',
  'DiskReadOps',
  'DiskWriteBytes',
  'DiskWriteOps',
  'NetworkIn',
  'NetworkOut',
  'StatusCheckFailed',
  'StatusCheckFailed_Instance',
  'StatusCheckFailed_System',
  'CPUCreditUsage',
  'CPUCreditBalance'];
  public timeRanges = [{
    text: "Last Hour",
    value: 60 //mins
  },{
    text: "Last 3 Hours",
    value: 3 * 60 //mins
  },{
    text: "Last 6 Hours",
    value: 6 * 60 //mins
  },{
    text: "Last 12 Hours",
    value: 12 * 60 //mins
  },{
    text: "Last 24 Hours",
    value: 24 * 60 //mins
  },{
    text: "Last 3 Days",
    value: 3 * 24 * 60 //mins
  },{
    text: "Last 1 Week",
    value: 7 * 24 * 60 //mins
  },{
    text: "Last 3 Weeks",
    value: 3 * 7 * 24 * 60 //mins
  }];
  public periods = [{
    text: "5 Minutes",
    value: 5
  }, {
    text: "15 Minutes",
    value: 15
  }, {
    text: "1 Hour",
    value: 60
  }, {
    text: "6 Hours",
    value: 6 * 60
  }, {
    text: "1 Day",
    value: 24 * 60
  }];

  public statistics = [{
    text: 'Average',
    value: 'Average'
  }, {
    text: 'Minimum',
    value: 'Minimum'
  }, {
    text: 'Maximum',
    value: 'Maximum'
  }, {
    text: 'Sum',
    value: 'Sum'
  }, {
    text: 'SampleCount',
    value: 'SampleCount'
  }];

  public types = [{
    name: "statistic",
    arr: this.statistics
  }, {
    name: "timeRange",
    arr: this.timeRanges
  }, {
    name: "period",
    arr: this.periods
  }];
  public metrics = [];
  public selectedGraps:any = [];

  ngOnInit() {
    var self = this;
    self.isLoading = false;
    this.instanceId = this.instanceIds[0];
    this.metricControl = new FormControl();
    let types = self.types;
    let params = ''
    this.route.params.subscribe((params: Params) => {
      this.apiUrl = "organizations/"+ this.userStore.user.value.organizationId +"/projects/" + params['projectId'] +"/tests/" + params['testId'] + "/servermetric";
    });
    
    this.metrics = _.map(this.metricNames, function(name){
      self.selectedGraps.push(name);
      return {
        name: name,
        statistic: self.statistics[0],
        timeRange: self.timeRanges[0],
        period: self.periods[0],
        show: true,
        types: types
      }
    });
  
    //this.getCWMetrics([]);
    // if (this.instanceIds) {
    //   this.drawCharts(this.instanceIds);
    // }
  }

  ngAfterViewInit() {
    this.drawCharts(null);
    
}

  public showMetric = function(metric){
    metric.show =! metric.show;
  }

  public closeMetric = function(metric){
    metric.show = false;
    var self = this;
    _.remove(this.selectedGraps, function(name){
      return name == metric.name
    })
  }

  public selectMetric = function(metric, type, opt){
    metric[type.name] = opt;
    //this.getCWMetrics([metric]);
  }
  public removeInstance = function(idx) {
    this.instanceIds.splice(idx, 1);
  }
  public addMoreInstance = function(){
    this.instanceIds.push("");
  }

  public drawCharts = function (instanceIds) {
    if(!this.instanceId){
      this.toastr.error('Please fill EC2 Instance ID frist.');
      return;
    }
    var self = this;
    self.isLoading = true;
    var apis:any = [];
    _.each(this.metrics, function(metric){
      apis.push(self.organizationService.get(self.apiUrl +"?metricName=" + metric.name+"&instanceId=" + self.instanceId))
    });
    Observable.forkJoin(apis)
       .subscribe((response) => {
        self.isLoading = false;
          _.each(this.metrics, function(metric, index){
            if (!metric.show) return;
            var metricData:any = [];
            var  xs = {};
            var timestamp = ['x0'].concat(_(response[index]['Datapoints']).map('Timestamp').map(function(date){
              return new Date(date);
            }).value());
            metricData.push(timestamp);
            var average = [self.instanceId].concat(_.map(response[index]['Datapoints'], 'Average'));
            metricData.push(average);
            xs[self.instanceId] = 'x0';
            c3.generate({
              bindto: "#chart_" + metric.name,
              padding: {
                right: 20
              },
              // size: {
              //   height: 250,
              //   width: 'auto'
              // },
              data: {
                xs: xs,
                columns: metricData
              },
              axis: {
                    x: {
                      type: 'timeseries',
                      tick: {
                        // rotate: 45,
                        format: '%H:%M:%S',
                        culling: false,
                        count: 7
                      }
                    },
                    y: {
                      tick: {
                        count: 5,
                        format: function(item){
                          if (item > 10) return item.toFixed(0);
                          else return item.toFixed(1);
                        }
                      }
                    }
                  },
                  grid: {
                    x: {
                      show: true
                    },
                    y: {
                      show: true
                    }
                  },
                  point: {
                    r: 3,
                    focus: {
                      expand: {
                        r: 6
                      }
                    }
                  }
            });
          });
       });
    
  }
}
