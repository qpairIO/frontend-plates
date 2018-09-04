import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { OrganizationService } from '../organization/organization-service';

@Injectable()
export class TestResolver implements Resolve<any> {

  constructor(private organizationService: OrganizationService) {}

  resolve(route: ActivatedRouteSnapshot) {

    //this.OrganizationService.getProject(route.paramMap.get('projectId')).subscribe(project => {
        //hardcode to test
        //http://localhost:1337/api/v1/projects/34966c98-6c7d-4fd8-8352-5af104f40a49/tests
        //this.tests = project;
        //this.globalSettings.updateValue({test:this.tests});
      //});
      return {
        "projectId": "34966c98-6c7d-4fd8-8352-5af104f40a49",
        "name": null,
        "description": null,
        "testId": "53f3e000-7956-11e8-8c7f-dfc0de91fba2",
        "fileName": "sample.jmx.html",
        "parameter": null,
        "apis": [
          {
            "name": "HTTP Request",
            "path": "/",
            "params": [],
            "header": {}
          },
          {
            "name": "HTTP Request",
            "path": "/",
            "params": [
              ""
            ],
            "header": {}
          },
          {
            "name": "HTTP Request",
            "path": "/1",
            "params": [
              ""
            ],
            "header": {
              "content-type": "application/json"
            }
          },
          {
            "name": "HTTP Request",
            "path": "/${counter_value}",
            "params": [],
            "header": {
              "content-type": "application-json"
            }
          }
        ],
        "controllers": [],
        "listeners": [
          {
            "tag": "ResultCollector",
            "name": "View Results Tree",
            "enabled": "true"
          },
          {
            "tag": "BackendListener",
            "name": "Backend Listener",
            "enabled": "true"
          }
        ],
        "totalUsers": {
          "multiplier": 1,
          "totalNum": 0
        },
        "variables": {
          "threadCount": {
            "name": "threadCount",
            "value": "30",
            "editable": true
          },
          "rampUp": {
            "name": "rampUp",
            "value": "180",
            "editable": true
          },
          "host": {
            "name": "host",
            "value": "http://a02c93233c00911e781740e9003bf825-1026187243.us-east-1.elb.amazonaws.com",
            "editable": true
          },
          "testName": {
            "name": "testName",
            "value": "${testName}",
            "editable": false
          },
          "duration": {
            "name": "duration",
            "value": " 60",
            "editable": true
          },
          "influxDbHost": {
            "name": "influxDbHost",
            "value": "a2c7c5a64bf0d11e7b4c80e431e3f8e1-764326386.us-east-1.elb.amazonaws.com",
            "editable": true
          },
          "influxDbPort": {
            "name": "influxDbPort",
            "value": "8086",
            "editable": true
          },
          "nodeName": {
            "name": "nodeName",
            "value": "${testName}",
            "editable": false
          },
          "influxDBHost": {
            "name": "influxDBHost",
            "value": "influxdb.deploybytes.com",
            "editable": false
          },
          "influxDBPort": {
            "name": "influxDBPort",
            "value": "80",
            "editable": false
          },
          "influxDBUser": {
            "name": "influxDBUser",
            "value": "jmeter",
            "editable": false
          },
          "influxDBPassword": {
            "name": "influxDBPassword",
            "editable": false
          },
          "influxDBDatabase": {
            "name": "influxDBDatabase",
            "value": "newlistener",
            "editable": false
          },
          "retentionPolicy": {
            "name": "retentionPolicy",
            "value": "autogen",
            "editable": false
          },
          "samplersList": {
            "name": "samplersList",
            "value": ".*",
            "editable": false
          },
          "useRegexForSamplerList": {
            "name": "useRegexForSamplerList",
            "value": "true",
            "editable": false
          }
        },
        "createdAt": "2018-06-26T15:33:51.000Z",
        "updatedAt": "2018-07-02T12:38:27.000Z"
      }
  }
}