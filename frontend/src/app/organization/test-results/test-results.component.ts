import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.scss']
})
export class TestResultsComponent implements OnInit {
  public testResults:any = [
    {
      "testRunId": "c8346b71-0099-4e54-b18e-2ec859c5b29f",
      "testId": "35bcaa20-1805-11e8-a4e6-f115ca9fd531",
      "releaseId": "r3",
      "projectId": "b4455754-0681-42ba-a941-ed595c47f627",
      "testConfigId": "aec59e68-447c-4497-8b2f-dbd38dd86129",
      "grid_id": "8aee113f-bbbc-4503-b9ca-bf46e01c17f8",
      "timeStart": null,
      "timeEnd": null,
      "created_by": "51",
      "orgId": " 39ba95e6-97bf-4f16-839a-a0b6eae54777 ",
      "appId": 1,
      "exitCode": 1,
      "user_id": "51 ",
      "createdAt": "2018-02-22T19:18:49.000Z",
      "updatedAt": "2018-02-22T19:40:17.000Z",
      "startTime": null,
      "endTime": null,
      "description": null,
      "testFolder": " null ",
      "aws_profile": "null ",
      "aws_access_key_id": "null",
      "aws_secret_access_key": "null",
      "aws_region": "null",
      "status": null,
      "updated_by": "51",
      "grid_name": "loadswarmtest",
      "fileName": "loadswarm.jmx",
      "parameter": null,
      "apis": "[{\"name\":\"HTTP Request\",\"path\":\"/\",\"params\":[],\"header\":{}},{\"name\":\"HTTP Request\",\"path\":\"/\",\"params\":[\"\"],\"header\":{}},{\"name\":\"HTTP Request\",\"path\":\"/1\",\"params\":[\"\"],\"header\":{\"content-type\":\"application/json\"}},{\"name\":\"HTTP Request\",\"path\":\"/${counter_value}\",\"params\":[],\"header\":{\"content-type\":\"application-json\"}}]",
      "controllers": "[]",
      "listeners": "[{\"tag\":\"ResultCollector\",\"name\":\"View Results Tree\",\"enabled\":\"true\"},{\"tag\":\"BackendListener\",\"name\":\"Backend Listener\",\"enabled\":\"true\"}]",
      "totalUsers": "{\"multiplier\":1,\"totalNum\":0}",
      "variables": "{\"threadCount\":{\"name\":\"threadCount\",\"value\":\"30\",\"editable\":true},\"rampUp\":{\"name\":\"rampUp\",\"value\":\"180\",\"editable\":true},\"host\":{\"name\":\"host\",\"value\":\"http://a02c93233c00911e781740e9003bf825-1026187243.us-east-1.elb.amazonaws.com\",\"editable\":true},\"testName\":{\"name\":\"testName\",\"value\":\"${testName}\",\"editable\":false},\"duration\":{\"name\":\"duration\",\"value\":\" 60\",\"editable\":true},\"influxDbHost\":{\"name\":\"influxDbHost\",\"value\":\"a2c7c5a64bf0d11e7b4c80e431e3f8e1-764326386.us-east-1.elb.amazonaws.com\",\"editable\":true},\"influxDbPort\":{\"name\":\"influxDbPort\",\"value\":\"8086\",\"editable\":true},\"nodeName\":{\"name\":\"nodeName\",\"value\":\"${testName}\",\"editable\":false},\"influxDBHost\":{\"name\":\"influxDBHost\",\"value\":\"influxdb.deploybytes.com\",\"editable\":false},\"influxDBPort\":{\"name\":\"influxDBPort\",\"value\":\"80\",\"editable\":false},\"influxDBUser\":{\"name\":\"influxDBUser\",\"value\":\"jmeter\",\"editable\":false},\"influxDBPassword\":{\"name\":\"influxDBPassword\",\"editable\":false},\"influxDBDatabase\":{\"name\":\"influxDBDatabase\",\"value\":\"newlistener\",\"editable\":false},\"retentionPolicy\":{\"name\":\"retentionPolicy\",\"value\":\"autogen\",\"editable\":false},\"samplersList\":{\"name\":\"samplersList\",\"value\":\".*\",\"editable\":false},\"useRegexForSamplerList\":{\"name\":\"useRegexForSamplerList\",\"value\":\"true\",\"editable\":false}}",
      "name": "Loadswarm",
      "gridName": "loadswarmtest",
      "testName": null,
      "testDescription": null
    }
  ];
  constructor(public router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  public viewTest = function(item){
    this.router.navigate(['/project', item.projectId, item.testId], {relativeTo: this.route}); 
  }
}
