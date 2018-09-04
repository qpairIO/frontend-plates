import { Component, OnInit } from '@angular/core';
import { GlobalSettings } from '../../../service/data.shared';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
@Component({
  selector: 'app-client-metric',
  templateUrl: './client-metric.component.html',
  styleUrls: ['./client-metric.component.scss']
})
export class ClientMetricComponent implements OnInit {
  public grafanaServerUrl:any;
  public loading:boolean;
  public loadingError:boolean;
  public testResult:any = {};
  public global:any = {};
  public isTestResults:boolean;
  public grid:any;

  constructor(private globalSettings: GlobalSettings, public sanitizer: DomSanitizer, public toastr: ToastrService, public router: Router, private route: ActivatedRoute) { 
    this.globalSettings.globalValue$.subscribe(newValue => {
      if(newValue.grid && newValue.grid.name){
        this.grid = newValue.grid;
        this.grafanaServerUrl = 'http://grafana.deploybytes.com/dashboard/db/kubernetes-deployment-metrics?orgId=1&var-Node=All&var-Namespace=default&var-Deployment=' + newValue.grid.name + '&theme=light&kiosk';
        this.loadingError = false;
        this.loading = false;
      }
    });
  }

  ngOnInit() {
    let data = this.globalSettings.getValue();
    if(!data || !data.grid){
      setTimeout(() => {
        this.toastr.error('Please select lab first.');
        this.router.navigate(['../select-lab'], {relativeTo: this.route});
      })
      return;
    }else{
      this.grid = data.grid;
    }
    this.loading = false;
    this.isTestResults = true;
    this.loadingError = false;
    this.simplifyGrafana();
    window.setTimeout(function () {
      if (this.loading) {
        this.loadingError = true;
      }
    });
    if (this.global.testConfig) {
      var startTime = this.testResult && this.testResult.startTime ? moment(this.testResult.startTime) : moment();
      var endTime = this.testResult && this.testResult.endTime ? moment(this.testResult.endTime) : moment();
      var iframeUrl;
      if (this.isTestResults) {
        iframeUrl = 'http://grafana.deploybytes.com/dashboard/db/kubernetes-deployment-metrics?var-request='+this.global.testConfig.testRunId+'&orgId=1&var-Node=All&var-Namespace=default&var-Deployment='+this.testResult.gridName+'&from='+startTime.valueOf()+'&to='+endTime.valueOf()+'&theme=light&kiosk';
      }
      else {
        iframeUrl = 'http://grafana.deploybytes.com/dashboard/db/kubernetes-deployment-metrics?refresh=5s&orgId=1&var-jobname=*&theme=light&kiosk';
        if (this.global.this.testResultId) {
          iframeUrl += '&var-request='+this.global.this.testResultId;
        }
      }
      
      this.grafanaServerUrl = iframeUrl;
      console.log(this.grafanaServerUrl );
    }
    this.grafanaServerUrl = "http://grafana.deploybytes.com/d/AQjISg7mk/jmeter-load-test?refresh=5s&orgId=1&var-request=740b1c1e-1e2c-41d3-ad63-6ff56c4f35ee&var-aggregation=60&theme=light&kiosk"; 
  }

  public simplifyGrafana = function () {
    window.setTimeout(function () {
      if (!this.loadingError) {
        this.loading = false;
      }
    })
  }

}
