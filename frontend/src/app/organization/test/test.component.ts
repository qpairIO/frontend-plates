import { Component, OnInit, Inject } from '@angular/core';
import { OrganizationService } from '../organization-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONSTANT } from '../../constants/constants.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  public global = {
    editingItem: null,
    properties: CONSTANT.StaticParams.userdefinedProperties,
    isTestResults: false,
    currentState: true ? 'user.organization.project.test-results' : 'user.organization.project.test',
    currentTest: {},
    testResultId: {},
    testConfig: {},
    parameters: {}
  };
  public grids:any;
  public test:any;
  public testId:any;
  public projectId:any;

  constructor(public OrganizationService: OrganizationService,  public toastr: ToastrService, public router:Router, public route: ActivatedRoute, public dialog: MatDialog) {
  
   }

  ngOnInit() {
    var self = this;
    // Restangular.one('api/v1/testResult', $stateParams.testRunId).get();
    this.route.params.subscribe((params: Params) => {
      self.testId = params['testId'];
      self.projectId = params['projectId'];
      //hard code data to test
      //this.OrganizationService.getProject(params['projectId'], params['testId']).subscribe(project => {
        //hardcode to test
        //http://localhost:1337/api/v1/projects/34966c98-6c7d-4fd8-8352-5af104f40a49/tests
        self.global.currentTest = {
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
              "value": "kube",
              "editable": true
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
            }
          },
          "createdAt": "2018-06-26T08:33:51.000Z",
          "updatedAt": "2018-06-26T08:33:51.000Z"
        };
      //});

      this.grids = this.route.snapshot.data['grids'] || [];
    });
      

      //this.OrganizationService.getProject(params['projectId'], params['testId']).subscribe(testResult => {
        // if (testResult) {
        //   this.global.selectedGridId = testResult.grid_id;
        //   this.global.selectedGrid = _.find(grids, function (g) {
        //     return g.grid_id == testResult.grid_id;
        //   })
        //   this.global.testResultId = testResult.testRunId;
        //   this.global.currentTest = testResult;
        //   this.global.testConfig = {
        //     testRunId: testResult.testRunId
        //   }
        //   this.global.parameters = this.parameterParsing(testResult.jmeterParameters);
        // }
      //});
    //})
  }

  // public parameterParsing = function (str) {
  //   if (!str) return [];
  //   var parameterArray = str.split(' ');
  //   var parameters = [];
  //   _.forEach(parameterArray, function (param) {
  //     param = param.replace(/-/g, '');
  //     var collection = param.split('=');
  //     var parameterName = collection[0];
  //     if (parameterName.indexOf('J') == 0) {
  //       parameterName = parameterName.replace('J', '');
  //     }
  //     parameters.push({
  //       name: parameterName;
  //       value: collection[1]
  //     });
  //   })
  //   return parameters;
  // }

}
