import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Component({
  selector: 'app-client-status',
  templateUrl: './client-status.component.html',
  styleUrls: ['./client-status.component.scss']
})
export class ClientStatusComponent implements OnInit {
  public global:any = {};
  public loading:boolean = true;
  public loadingError:boolean = false;
  public testResult:any;
  public iframeUrl:any;
  constructor(public sanitizer: DomSanitizer) { }
  //testResult = Restangular.one('api/v1/testResult', $stateParams.testRunId).get();
  ngOnInit() {
    if (this.global.testConfig && this.testResult) {
      var startTime = this.testResult && this.testResult.startTime ? moment(this.testResult.startTime) : moment();
      var endTime = this.testResult && this.testResult.endTime ? moment(this.testResult.endTime) : moment();
      var iframeUrl;

      // if (isTestResults) {
      //   iframeUrl = 'http://grafana.deploybytes.com/d/AQjISg7mk/jmeter-load-test?refresh=5s&orgId=1&from='+startTime.valueOf()+'&to='+endTime.valueOf()+'&var-request=cac4b37a-1351-40f2-8b68-6cdd1550c287&var-aggregation=60&theme=light&kiosk'
      // }
      // else {
      //   iframeUrl = 'http://grafana.deploybytes.com/d/AQjISg7mk/jmeter-load-test?refresh=5s&orgId=1&var-request='+$scope.global.testConfig.testRunId+'&var-aggregation=60&theme=light&kiosk';
        
      // }
      //this.iframeUrl = "http://grafana.deploybytes.com/d/tmOUfuGmz/kubernetes-cluster-monitoring-via-prometheus?refresh=10s&orgId=1&theme=light&kiosk"; 
    }
    //hard code link to test
    
    this.iframeUrl = "http://grafana.deploybytes.com/d/AQjISg7mk/jmeter-load-test?refresh=5s&orgId=1&var-request=740b1c1e-1e2c-41d3-ad63-6ff56c4f35ee&var-aggregation=60&theme=light&kiosk"; 
    this.loadingError = false;
    this.loading = false;
    setTimeout(function () {
      if (this.loading) {
        this.loadingError = true;
      }
    }, 10000);
  
  }

  public simplifyGrafana = function () {
    setTimeout(function () {
      if (!this.loadingError) {
        this.loading = false;
      }
    })
  }

}
