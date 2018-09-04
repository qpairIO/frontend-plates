import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { OrganizationService } from '../organization-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GlobalSettings } from '../../service/data.shared';
import {UserStore} from '../../user/user.store';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { CONSTANT } from '../../constants/constants.component';

@Component({
    selector: 'app-test-result-status',
    template: '<div class="text-center" flex="flex" layout="layout" layout-align="center center"><div id="running-test-status" *ngIf="global.runTestStatus" style="width: 400px;margin-right:15px;">' +
        '<div class="progressbar">' +
        '<div style="width: 100%" class="progressbar-value bg-primary">' +
        '<div style="width: 100%" class="progress-overlay"></div>' +
        '<div class="progress-label"><h3>{{global.runTestStatus}}</h3></div></div></div></div></div>'
})

export class TestResultStatusComponent implements OnInit {
    public testConfigParams:any;
    public urlApi:any;
    constructor(private http: Http,
        private el: ElementRef,
        public globalSettings:GlobalSettings,
        private OrganizationService: OrganizationService, public toastr: ToastrService, public userStore: UserStore, public router:Router, public route: ActivatedRoute, public dialog: MatDialog
    ) { 
       
       
    }
    @Input() global: any;
    ngOnInit() {
        var self = this;
        
        this.route.params.subscribe((params: Params) => {
            this.urlApi = "organizations/"+ self.userStore.user.value.organizationId +"/projects/" + params['projectId'] + "/tests/" + params['testId'] + "/" ;
            self.global.runTest = function () {
                let data = self.globalSettings.getValue();
                if(data && data.grid){
                    self.global.selectedGrid = data.grid;
                }
                if (!self.global.selectedGrid) {
                    self.toastr.error('You need select lab frist.');
                    return;
                }
                if (!self.global.parameters || !self.global.parameters.length) {
                    // swal({
                    //     title: 'ERROR',
                    //     text: 'You have to add parameters',
                    //     type: 'error'
                    // }, function () {
                    //     $state.go('^.config');
                    // });
                    // return;
                }
                self.globalSettings.updateValue({selectedGrid:self.global.selectedGrid });
    
                //generate uuid as restresultid=testRunId
                self.global.testResultId = CONSTANT.globalUtils.generateUUID();
                // POST test config
                self.global.projectId = params['projectId'];
                //below saving into testConfig table
                var testConfigParams = {
                    "orgId": self.userStore.user.value.organizationId,
                    "appId": 1,
                    "bucket_name": CONSTANT.configData[0]['bucket_name'],
                    "pem_file_path": CONSTANT.configData[0]['pem_file_path'],
                    "jmx_file_path": 'loadswarmjmx/jmx/project-' + params['projectId'] + '/' + CONSTANT.configData[0]['jmx_file_path'],
                    // "properties_file_path": CONSTANT.configData.properties_file_path,
                    "properties_file_path": self.global.testResultId + '/user.properties',
                    "results_file": "test.jtl",
                    "jmeter_parameters": "",
                    "jmeter_path": "/home/ec2-user/apache-jmeter-3.0/bin/./jmeter",
                    "jmx_destination_dir": "/home/ec2-user/test/",
                    "jtl_file_dir": "/home/ec2-user/test/",
                    "log_file_path": "/home/ec2-user/jmeter.log",
                    "userdefined_properties_path": "/home/ec2-user/apache-jmeter-3.0/bin/userdefined.properties",
                    "user_id": self.userStore.user.value.id
                }
    
                // "jmeter_parameters": "-JthreadCount=10 -JrampUp=3",
                // Prepare parameters
                _.forEach(self.global.parameters, function (parameter, index) {
                    if (index > 0) {
                        testConfigParams.jmeter_parameters += ' ';
                    }
                    var stringParam = '-J' + parameter.name + '=' + parameter.value;
                    testConfigParams.jmeter_parameters += stringParam;
                });
    
                self.testConfigParams = testConfigParams;
    
                if (CONSTANT.configData && self.global.selectedGrid) {
                    self.global.testConfig = {
                        "testId": params['testId'],
                        "releaseId": "r3",
                        "projectId": params['projectId'],
                        "grid_id": self.global.selectedGrid.id,
                        "testConfigId": CONSTANT.configData['testConfigId'],
                        "exitCode": 1,
                        "user_id": self.userStore.user.value.id ,
                        "testRunId": self.global.testResultId
                    };
                }
    
    
    
                self.global.runTestStatus = 'Running Test';
                if (self.global.selectedGrid) {
                    console.log("you can put code here");
                    console.log("self is jemeter test variable")
                    var apiUrl = 'http://nodeapi.deploybytes.com/api/v0/getInstance/';
                    console.log("self is selected grid name", self.global.selectedGrid.name)
                  
                    self.OrganizationService.getInstance(self.global.selectedGrid.name).subscribe(data => {
                        var link:any = "ae1e17f1e851b11e8968402833533936-1583985098.us-west-2.elb.amazonaws.com";
                        if(data){
                            link = data;
                        }
                        var apiUrl = 'http://' + link + '/perfDriver/v0/jmeter';
                        var runTestParams = {
                            "bucket_name": self.global.configData.bucket_name,
                            "jmx_file_path": self.global.currentTest.fileName,
                            "pem_file_path": self.global.configData.pem_file_path,
                            "properties_file_path": self.global.testResultId+'/userdefined.properties',
                            'destination_jmx_path': self.global.currentTest.fileName,
                            "destination_prop_file_path": "user.properties"
                        }
                        var runTestParamsHardcode = {"bucket_name":"loadswarmjmx","jmx_file_path":"jmx/project-74b23443-5df7-4331-adf0-8091bce3fc43/loadswarm_test.jmx","destination_prop_file_path":"user.properties","properties_file_path":"properties/user.properties","param":"-Jduration=160 -JrampUp=150 -JthreadCount=10 -JtestName=740b1c1e-1e2c-41d3-ad63-6ff56c4f35ee -Jgrid_name=testflow","destination_jmx_path":"loadswarm_test.jmx"}
                        self.OrganizationService.runTestParams(runTestParamsHardcode).subscribe(data => {
                            console.log(data)
                        });
                    });
                    
                    //iframe link
                    //http://grafana.deploybytes.com/d/AQjISg7mk/jmeter-load-test?refresh=5s&orgId=1&var-request=740b1c1e-1e2c-41d3-ad63-6ff56c4f35ee&var-aggregation=60&theme=light&kiosk
                    self.global.runTestStatus = 'Saving Test Config';
                    self.OrganizationService.create(self.urlApi + "testconfigs", testConfigParams).subscribe(data => {
                        console.log(data)
                        self.global.runTestStatus = null;
                        self.router.navigate(['./client-status'], {relativeTo: self.route}); 
                    });
                    // self.OrganizationService.saveTestConfig(testConfigParams).subscribe(data => {
                    //     console.log(data)
                    //     self.global.runTestStatus = null;
                    //     self.router.navigate(['./client-status'], {relativeTo: self.route}); 
                    // });
                   
                    /*
                    


                    Restangular.all('another',apiUrl).customGET('', {
                      gridname :self.global.selectedGrid.grid_name
                    }).then(function (test) {
                       console.log('self is another call output', test)
                    })*/
    
    
                     Restangular.allUrl('getInstance', apiUrl)
                         .customGET('', { gridname: self.global.selectedGrid.grid_name })
                         .then(function (result) {
    
                    //         console.log("self is for get call", result)
                    //         //code for saving and uploading
                    //         uploadTestConfig(testConfigParams).then(function (uploadTestConfigResults) {
                    //             console.log('self is test config grid id', self.global.testConfig.grid_id);
                    //             getTestConfig(uploadTestConfigResults.testConfigId).then(function () {
                    //                 console.log("self data in test config run ID", uploadTestConfigResults.testConfigId);
                    //                 //save into database with testResult_Parent
                    //                 Restangular.one('/api/v1').post('testRun', {
                    //                     "testRunId": self.global.testConfig.testRunId,
                    //                     "testId": $state.params.testId,
                    //                     "releaseId": "r3",
                    //                     "projectId": $state.params.projectId,
                    //                     "grid_id": self.global.testConfig.grid_id,
                    //                     "testConfigId": uploadTestConfigResults.testConfigId,
                    //                     "exitCode": 1,
                    //                     "created_by": $stateParams.userId,
                    //                     "user_id": "a2",
                    //                     "appId": 1,
                    //                     "orgId": $stateParams.organizationId,
                    //                 });
                    //             });
    
                                 console.log("These are string parameters", testConfigParams.jmeter_parameters);
                                 var runTestParams = {
                                     "bucket_name": CONSTANT.configData.bucket_name,
                                     "jmx_file_path": 'jmx/project-' + $state.params.projectId + '/' + CONSTANT.configData.jmx_file_path,
                                     "destination_prop_file_path": "user.properties",
                                     "properties_file_path": "properties/user.properties",
                                     "param": testConfigParams.jmeter_parameters + " -JtestName=" + self.global.testConfig.testRunId + " -Jgrid_name=" + self.global.selectedGrid.grid_name,
                                     "destination_jmx_path": self.global.currentTest.fileName
                                 }
    
                                 console.log(self.global.parameters);
                                 console.log("self is loadbalancer link from deploybytes", result);
                                 var apiUrl = 'http://' + result + '/perfDriver/v0/jmeter';
                                 Restangular.allUrl('runTest', apiUrl)
                                     .customPOST(runTestParams, '').then(function () {
    
                    //                     var slackUrl = "https://hooks.slack.com/services/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";
    
                    //                     Restangular.allUrl('slackmsgs', 'https://hooks.slack.com/services/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')
                    //                         .customPOST({ "text": "Test is started" }, '')
                    //                         .then(function () {
                    //                             console.log("message sent to slack");
    
                    //                         })
    
    
                                         console.log("self is jemter post call")
                                         console.log(runTestParams.bucket_name);
                                         console.log(runTestParams.jmx_file_path);
                                         console.log(runTestParams.destination_jmx_path);
                                         swal('Test started successfully', '', 'success');
                                         $mdDialog.hide();
                                         self.global.runTestStatus = '';
                                         $state.go('^.client-status');
                                     })
    
                    //         }, function (err) {
                    //             swal('ERROR', 'There is an error when saving test config', 'error');
                    //             $mdDialog.hide();
                    //         })//upload test config
    
                    //     })
    
                    /*
                    GridService.getGridInstances(self.global.selectedGrid).then(function () {
                      if (!self.global.selectedGrid.activeInstances.length) {
                        swal('ERROR', 'There is no started instances in ' + self.global.selectedGrid.grid_name, 'error');
                        $mdDialog.hide();
                        return;
                      }
                      else {
                        uploadTestConfig(testConfigParams).then(function (uploadTestConfigResults) {
                          if (uploadTestConfigResults.body.status != 'SUCCESS') {
                            swal('ERROR', 'There is an error when saving tets config', 'error');
                            $mdDialog.hide();
                          }
                          getTestConfig(uploadTestConfigResults.body.data).then(function () {
                            uploadProperties().then(function () {
                              getInstanceIP().then(function (ips) {
                                self.global.runTestStatus = 'Running Test';
                                $q.all(_.map(ips.data, function (ip) {
                                  return runTest(ip);
                                })).then(function () {
             
                                }, function () {
                                  self.global.runTestStatus = '';
                                  swal('ERROR', err && err.data || 'There is an error when running test', 'error');
                                })
                              });
                            }, function () {
                              swal('ERROR', 'There is an error when uploading properties', 'error');
                            })
                          })
             
             
             
             
                          // self.global = uploadTestConfigResults.data;
                        })
             
                        // self.global.runTestStatus = 'Running Test';
                        // V2Restangular.one('run-jmeter-test').post('', self.global).then(function (runTestResults) {
                        //   if (runTestResults.status == 'SUCCESS') {
                        //     swal('DONE', '', 'success');
                        //     $mdDialog.hide(true);
                        //   }
                        //   else {
                        //     swal('ERROR', 'There is an error when running test', 'error');
                        //     $mdDialog.hide();
                        //   }
                        // }, function () {
                        //   swal('ERROR', 'There is an error when running test', 'error');
                        //   $mdDialog.hide();
                        // })
                      }
                    })*/
                    // getInstanceIP()
                });
            }
            
          //});
	    }
        
    });
    }

    public uploadTestConfig = function () {
        this.global.runTestStatus = 'Saving Test Config';
        //return RestangularForCreating.one('saveTestConfig').post('', self.testConfigParams)
        }

        public getTestConfig = function (testConfigId) {
            this.global.testConfig.testConfigId = testConfigId;
            // return V3Restangular.one('get-test-config-by-testconfigid').customGET('', {
            //     testConfigId: testConfigId
            // }).then(function (testConfigResults) {
            //     if (testConfigResults.status == 'SUCCESS') {
            //         // self.global = testConfigResults.data[0];
            //     }
            // })
        }

        public uploadProperties = function () {
            var propertyContent = {};
            _.forEach(this.global.properties, function (property) {
                propertyContent[property.key] = property.value;
            });
            propertyContent['summariser.influx.project'] = this.global.projectId;
            propertyContent['summariser.influx.project.suite'] = this.global.testResultId;
            this.global.runTestStatus = 'Uploading Properties';

            // return Restangular.one('/api/v1').post('saveTestConfig', {
            //     bucket: self.testConfigParams.bucket_name,
            //     content: propertyContent,
            //     filePath: self.testConfigParams.properties_file_path
            // })
        }

        // var runTest = function () {
        //   self.global.runTestStatus = 'Running Test';
        //   return V6Restangular.one('run-jmeter-test').post('', self.global.testConfig).then(function (runTestResults) {
        //     if (runTestResults.status == 'SUCCESS') {
        //       swal('DONE', '', 'success');
        //       self.global.runTestStatus = '';
        //     }
        //     else {
        //       swal('ERROR', runTestResults.data || 'There is an error when running test', 'error');
        //       self.global.runTestStatus = '';
        //     }
        //   }, function (err) {
        //     swal('ERROR', err.data || 'There is an error when running test', 'error');
        //     self.global.runTestStatus = '';
        //   })
        // }


        public getInstanceIP = function () {
            var apiUrl = 'https://ar8zsf1hld.execute-api.us-east-1.amazonaws.com/prod/createInstancesInDescribe';
            // return Restangular.allUrl('createInstancesInDescribe', apiUrl).customPOST({
            //     InstanceId: self.global.selectedGrid.activeInstances
            // }, '')
        }

        public runTest = function (ip) {
            console.log("Running Test");
            var runTestParams = {
                "bucket_name": CONSTANT.configData['bucket_name'],
                "jmx_file_path": this.global.currentTest.fileName,
                "pem_file_path": CONSTANT.configData['pem_file_path'],
                "properties_file_path": this.global.testResultId + '/userdefined.properties',
                'destination_jmx_path': this.global.currentTest.fileName,
                "destination_prop_file_path": "user.properties"
            }
            //Raghu Commenting it out to test
            /*    _.forEach(self.global.parameters, function (param, index) {
                runTestParams[param.name] = param.value;
                runTestParams['param'+(1+index)] = 'J'+param.name;
              })
          */
          //  return Restangular.allUrl('runTest', 'http://' + ip + '/perfDriver/v0/jmeter').customPOST(runTestParams, '');

        }


        
    
}
