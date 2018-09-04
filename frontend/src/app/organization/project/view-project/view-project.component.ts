import { Component, OnInit, Inject } from '@angular/core';
import { OrganizationService } from '../../organization-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONSTANT } from '../../../constants/constants.component';
import { GlobalSettings } from '../../../service/data.shared';
import {UserStore} from '../../../user/user.store';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';

@Component({
  selector: 'dialog-overview-dialog',
  templateUrl: './dialog-overview-dialog.html',
})
export class DialogOverviewDialog {
  public githubLink:string;
  constructor(public dialogRef: MatDialogRef<DialogOverviewDialog>, @Inject(MAT_DIALOG_DATA) public data: any, private http: Http){
     
  }
  public cancel = function(){
    this.dialogRef.close();
  }

  public createGitHubLink = function(){
    
    this.http.post('http://localhost:1337/api/v2/users/66/organizations/3d4f1756-2473-4fec-8174-7d65c6380510/projects/34966c98-6c7d-4fd8-8352-5af104f40a49/getFromGit', {gitRepoLink: this.githubLink})
    .subscribe( resp => {
        console.log(resp);
        this.dialogRef.close();
    }, err => {
        console.log(err)
    });
           
  }

}
@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.scss']
})
export class ViewProjectComponent implements OnInit {
  public selectedType:any;
  public urlApi:any;
  public global:any;
  public project:any;
  public isSaving:boolean;
  public showingType:any;
  public panelOpenState: boolean = false;
  public newAMI:any;
  public newRelease:any = {};
  public newGrid:any = {};
  public amis:Array<Object>;
  public releases:Array<Object>;
  public grids:any;
  public tests: any;
  public projectId:any;
  public tmpAws:any;
  public aws:any;
  public editingGridChild:any = {};
  public isSavingGridChild:boolean;
  public options = {
    rowSelection: true,
    multiSelect: true,
    autoSelect: true,
    decapitate: false,
    largeEditDialog: false,
    boundaryLinks: false,
    limitSelect: true,
    pageSelect: true,
    limitOptions: [16, 24],
    label: {
      page: 'Page:',
      rowsPerPage: 'Per Page:',
      of: '/'
    }
  };
  public query = {
    order: '-id',
    limit: 16,
    page: 1,
    offset: 0,
  };
  public configStatuses = [
    {
      id: 'terminate',
      name: 'Be Terminate',
      color: ''
    },
    {
      id: 'stop',
      name: 'Stop',
      color: ''
    },
    {
      id: 'running',
      name: 'Running',
      color: ''
    },
    {
      id: 'started',
      name: 'Started',
      color: ''
    },
  ];
  public configTypes = [
    {
      id: 1,
      name: 'Type 1'
    },
    {
      id: 2,
      name: 'Type 2'
    },
    {
      id: 3,
      name: 'Type 3'
    },
    {
      id: 4,
      name: 'Type 4'
    }
  ];
  public utils = {};
  public organizationId:any;
  public searchText = "";
  public editingAws:boolean;
  public instanceTypes = CONSTANT.instanceTypes;
  public regions = CONSTANT.regions;
  public avaiableZones = CONSTANT.avaiableZones;
  public SubnetIDs = ['abc123'];
  public SecurityGroupIds = ['a1'];
  public instanceCloseStatuses = ['terminate', 'stop'];
  public uploadLink = "";
  public newTest = {
    title: '',
    description: '',
    fileType: 'upload'
  };
  public selectedGrid = null;
  constructor(public OrganizationService: OrganizationService, public userStore: UserStore,  public globalSettings:GlobalSettings, public toastr: ToastrService, public router:Router, private route: ActivatedRoute, public dialog: MatDialog) {
    this.project = {"name":"","description":"","testFolder":"null","aws_profile":"null","aws_access_key_id":"null","aws_secret_access_key":"null","aws_region":"null","status":"enabled","orgId":"3d4f1756-2473-4fec-8174-7d65c6380510","appId":1,"created_by":"66","updated_by":"66","user_id":"66","createdAt":"2018-06-14 09:25:52","updateAt":"2018-06-14 09:25:52"};
    this.showingType = '';
    this.newAMI =  {name:''};
    this.newRelease = {name:''};
    this.grids = [];
    this.amis = [
      {
        id: 'ami-1',
        name: 'AMI 1'
      },
      {
        id: 'ami-2',
        name: 'AMI 2'
      },
      {
        id: 'ami-3',
        name: 'AMI 3'
      }
    ];
    this.releases = [
      {
        id: 1,
        name: 'Release 1',
        description: 'Description Of release 1',
        date: moment().format()
      },
      {
        id: 2,
        name: 'Release 2',
        description: 'Description Of release 2',
        date: moment().format()
      },
      {
        id: 3,
        name: 'Release 3',
        description: 'Description Of release 3',
        date: moment().format()
      }
    ]
  }
  
  ngOnInit() {
    this.isSaving = false;
    this.global =  {addingNewGridChild: false} ;
    this.grids = this.route.snapshot.data['grids'].rows || [];
    this.organizationId = this.userStore.user.value.organizationId;
    this.tests = this.route.snapshot.data['tests'].rows || [];
    //this.globalSettings.updateValue({tests:this.tests});
    this.route.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
      this.urlApi = "organizations/"+ this.userStore.user.value.organizationId +"/projects/" + this.projectId + "/";
      this.uploadLink = "http://localhost:1337/api/v1/projects/" + params['projectId'] + "/uploadJmx";
    });
  }

  public filterTest = function(item){
    if (!this.searchText) return true;
    var foundAPI = _.find(item.apis, function(api) {
      return (api.path + api.name).toLowerCase().indexOf(this.searchText.toLowerCase()) > -1;
    });
    return !!foundAPI;
  }

  public addNewAMI = function () {
    this.amis.push(this.newAMI);
    this.toastr.success('Add new AMI successfully.')
    this.newAMI = {};
  }

  public addNewRelease = function () {
    this.releases.push(this.newRelease);
    this.toastr.success('Add new Release successfully.')
    this.newRelease = {};
  }

  public addNewGrid = function () {
    this.newGrid.hasError = false;
    var self = this;
    var formatCharacters = /[ !@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]/;
    var formatUppercase = /([A-Z])/;
    if (formatCharacters.test(this.newGrid.grid_name) || formatUppercase.test(this.newGrid.grid_name)) {
      this.newGrid.hasError = true;
      return;
    }

    this.isSaving = true;
    // let newGrid = {
    //   grid_id: null,
    //   grid_name: this.newGrid.grid_name,
    //   description: this.newGrid.description,
    //   orgId: '3d4f1756-2473-4fec-8174-7d65c6380510',
    //   projectId: '34966c98-6c7d-4fd8-8352-5af104f40a49',
    //   appId: 1,
    //   created_by: 66,
    //   updated_by: 66,
    //   user_id: 66,
    //   createdAt: moment().format('YYYY-MM-DD hh:mm:ss'),
    //   updatedAt: moment().format('YYYY-MM-DD hh:mm:ss'),
    // };
    this.OrganizationService.create(this.urlApi + "labs", this.newGrid).subscribe(results => {
        this.newGrid.id = results.id;
        this.grids.push(this.newGrid);
        this.selectGrid(results);
        self.toastr.success('New lab has been created.');
        //this.selectedGrid = _.cloneDeep(this.newGrid);
        this.isSaving = false;
    });
  }

  public removeGrid = function (grid) {
    var self = this;
    self.isSavingGridChild = true;
    this.OrganizationService.remove(this.urlApi + "labs/" + grid.id ).subscribe(data => {
      _.remove(this.grids, function (g) {
        return g.id == grid.id;
      });
      self.toastr.success('Remove lab successfully.');
      self.isSavingGridChild = false;
      this.backToTestList();
    })
  }

  public removeTest = function (test) {
    _.remove(this.tests, function (t) {
      return t.testId == test.testId;
    })
  }

  public addNewGridChild = function () {
    var self = this;
    this.editingGridChild.grid_name = this.selectedGrid.name;
    console.log("body being sent is ",this.editingGridChild);
    console.log("gridname sent is ",this.selectedGrid.name);
    self.isSavingGridChild = true;
    this.OrganizationService.create(this.urlApi + "labs/"+ this.selectedGrid.id +"/gridchildren", this.editingGridChild).subscribe(data => {
      this.selectedGrid.children.push(data);
      self.isSavingGridChild = false;
      self.global.addingNewGridChild = false;
    })
  }

  public removeGridChild = function (gridChild) {
    var self = this;
    this.OrganizationService.remove(this.urlApi + "labs/"+ this.selectedGrid.id +"/gridchildren/" + gridChild.id).subscribe(data => {
      _.remove(self.selectedGrid.children, function (c) {
        return c.id == gridChild.id;
      })
    })
  }

  public editGrildChild = function(gridChild){
    this.global.addingNewGridChild = true;
    this.editingGridChild = gridChild;
    
  }

  public updateGridChild = function(){
    var self = this;
    self.isSavingGridChild = true;
    this.OrganizationService.update(this.urlApi + "labs/"+ this.selectedGrid.id +"/gridchildren/" + this.editingGridChild.id, this.editingGridChild).subscribe(data => {
      self.global.addingNewGridChild = false;
      self.isSavingGridChild = false;
      self.global.selectedGridChild = false;
    })
  }

  public changeShowingType = function (type, justChangeName) {
    if (!justChangeName) {
      if (type == this.showingType) {
        this.showingType = null;
      }
      else {
        this.showingType = type;
      }
      if (type != 'new-grid-child') {
        this.selectedGrid = null;
      }
    }

    switch (type) {
      case 'new-grid':
        this.showingHeader = 'Create New GRID';
        break;
      case 'new-ami':
        this.showingHeader = 'Create New AMI';
        break;
      case 'new-release':
        this.showingHeader = 'Create New Release';
        break;
      case 'new-grid':
        this.showingHeader = 'Create New Grid';
        break;
      case 'new-grid-child':
        this.showingHeader = this.selectedGrid.grid_name;
        break;
      default:
        this.showingHeader = 'Tests';
    }
  }

  public selectGrid = function (grid, force) {
    if (!this.selectedGrid || force) {
      this.selectedGrid = grid;
      this.loadGridElements(grid);
      this.changeShowingType('new-grid-child');
      this.selectedGrid.show = true;
      return;
    }
    if ((this.selectedGrid && this.selectedGrid.id == grid.id)) {
      this.selectedGrid = null;
      this.changeShowingType();
    }
    else {
      this.selectedGrid = grid;
      this.loadGridElements(grid);
      this.changeShowingType('new-grid-child', true);
    }
  }

   public backToTestList = function () {
    this.selectedGrid = null;
    this.changeShowingType();
  }

  // this.utils.runTest = function (gridChild) {
  //   console.log(gridChild);
  //   // Get config data
  //   $mdDialog.show({
  //     templateUrl: 'templates/running-test-status.tpl.jade',
  //     locals: {
  //       data: {
  //         gridChild: gridChild
  //       }
  //     },
  //     controller: function (this, V3Restangular, data, $mdDialog, $stateParams) {
  //       this.status = 'Getting Instance Config';
  //       V3Restangular
  //         .one('get-launch-config-by-grid-ids').customGET('', {
  //           grid_id: data.gridChild.grid_id,
  //           grid_child_id: data.gridChild.grid_child_id
  //         })
  //         .then(function (configResults) {
  //           if (configResults.status == 'SUCCESS') {
  //             this.status = 'Starting Instances';
  //             var configData = configResults.data[0];
  //             configData.InstanceType = configData.instanceType;

  //             V2Restangular.one('launch-instance').post('', configData).then(function (instanceResults) {
  //               if (instanceResults) {
  //                 console.log(instanceResults);
  //                 var instancesArray = instanceResults.match(/\[(.*)\]/).pop().split(',');
  //                 instances = _.map(instancesArray, function (ins) {
  //                   return ins.match(/\'(.*)\'/).pop();
  //                 })

  //                 // Waiting for instance starting
  //                 $timeout(function () {

  //                   this.status = 'Running Test';
  //                   // Run test
  //                   V2Restangular.one('run-jmeter-test').post('', {

  //                     "testId":"id1",
  //                     "releaseId":"r3",
  //                     "projectId":"x1",
  //                     "orgId": $stateParams.organizationId,
  //                     "appId": 1,
  //                     "exitCode":1,
  //                     "instance_ids": instances,
  //                     "batch_test_duration":30,
  //                     "delay":5,
  //                     "bucket_name":"loadswarmjmx",
  //                     "pem_file_path":"pem/qaDashboard.pem",
  //                     "jmx_file_path":"jmx/Test_1.jmx",
  //                     "properties_file_path":"properties/userdefined.properties",
  //                     "jmeter_config_path":"configs/jmeter1.json",
  //                     "aws_config_path":"configs/config1.json",
  //                     "results_file": "test.jtl",
  //                     "jmeter_parameters": "-JthreadCount=10 -JrampUp=3",
  //                     "jmeter_path": "/home/ec2-user/apache-jmeter-3.0/bin/./jmeter",
  //                     "jmx_destination_dir": "/home/ec2-user/test/",
  //                     "jtl_file_dir": "/home/ec2-user/test/",
  //                     "log_file_path": "/home/ec2-user/jmeter.log",
  //                     "userdefined_properties_path": "/home/ec2-user/apache-jmeter-3.0/bin/userdefined.properties",
  //                     "created_by": $stateParams.userId,
  //                     "updated_by": $stateParams.userId,
  //                     "user_id": $stateParams.userId
  //                   }).then(function (runTestResults) {
  //                     console.log(runTestResults);
  //                     if (runTestResults.status != 'SUCCESS') {
  //                       swal('ERROR', 'There was an error when Running Test', 'error');
  //                       $mdDialog.hide();
  //                     }
  //                     else {
  //                       swal('DONE', '', 'success');
  //                       $mdDialog.hide();
  //                     }
  //                     // Stop instances
  //                     V3Restangular.one('stop-terminate-instances').post('', {
  //                       status: 'stop',
  //                       instanceIds: instances
  //                     })
  //                     .then(function (stopInstanceResults) {
  //                       if (stopInstanceResults.status == 'SUCCESS') {
  //                         // swal('DONE', '', 'success');
  //                         // $mdDialog.hide();
  //                       }
  //                       else {
  //                         // swal('ERROR', 'There was an error when Starting Instances', 'error');
  //                         // $mdDialog.hide();
  //                       }
  //                     })
  //                   }, function () {
  //                     swal('ERROR', 'There was an error when Running Test', 'error');
  //                     $mdDialog.hide();
  //                   })
  //                 }, 180000)

  //               }
  //               else {
  //                 swal('ERROR', '', 'error');
  //               }
  //             })
  //           }
  //           else {
  //             swal('ERROR', '', 'error');
  //           }
  //       })
  //     }
  //   })
  // }

  public startGridChild = function (gridChild) {
    // $mdDialog.show({
    //   templateUrl: 'templates/running-test-status.tpl.jade',
    //   locals: {
    //     data: {
    //       gridChild: gridChild,
    //       grid: this.selectedGrid,
    //     }
    //   },
    //   controller: function ($q, this, V3Restangular, data, $mdDialog, AlertService) {
    //     this.data = data;
    //     this.status = 'Starting Instance';
    //     var apiUrl = 'http://nodeapi.deploybytes.com/api/v0/gridDeployment';
    //     Restangular.allUrl('createInstancesInDescribe', apiUrl)
    //       .customPOST({
    //         noofinstances: data.gridChild.MaxCount,
    //         gridname: data.grid.grid_name
    //       }, '')
    //       .then(function () {
    //         swal('DONE', 'Grid instance have been started', 'success');
    //         $mdDialog.hide(true);
    //       }, function () {
    //         swal('ERROR', 'There is an error when starting instance', 'error');
    //         $mdDialog.hide(true);
    //       });
    //   }
    // }).then(function (result) {
    //   if (result) {
    //     this.loadGridElements(this.selectedGrid);
    //   }
    // });
  }

  public stopGrid = function (instanceId) {
    // if (this.selectedGrid.activeInstances.indexOf(instanceId) == -1) {
    //   swal('ERROR', 'The instance is not started yet', 'error');
    //   return;
    // }
    // V3Restangular.one('stop-terminate-instances').post('', {
    //   status: 'stop',
    //   instanceIds: [instanceId]
    // })
    // .then(function (stopInstanceResults) {
    //   if (stopInstanceResults.status == 'SUCCESS') {
    //     swal('DONE', 'The instance has been stopped.', 'success');
    //   }
    //   else {
    //     swal('ERROR', 'There is an error when stopping instance', 'error');
    //   }
    // }, function () {
    //   swal('ERROR', 'There is an error when stopping instance', 'error');
    // })
  }

  public loadGridElements = function (grid) {
    this.OrganizationService.get(this.urlApi + "labs/"+ grid.id +"/gridchildren").subscribe(data => {
      this.selectedGrid.children = data.rows;
      this.selectedGrid.show = false;
    })

  }

  public changeRegion = function () {
    var selectedRegion = _.find(this.regions, function (region) {
      return region.id == this.editingGridChild.region;
    });
    this.avaiableZones = selectedRegion ? selectedRegion.children : [];
    this.editingGridChild.AvailabilityZone = '';
  }

  public saveAws = function () {
    this.aws = _.cloneDeep(this.tmpAws);
  }

  public cancelEditingAws = function () {
    this.tmpAws = _.cloneDeep(this.aws);
  }

  public showGitRepo = function(){
    let dialogRef = this.dialog.open(DialogOverviewDialog, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });

    // inputDataDialog.show("Tests by Importing from Git Repo", [{
    //   name: 'gitRepoLink',
    //   label: 'Public Git Repository Link',
    //   value: ""
    // }]).then(function(fields){
    //   var data = _(fields).indexBy("name").mapValues(function(field){
    //     return field.value
    //   }).value();
    //   Restangular.one("api/v2/users", $state.params.userId)
    //     .one("organizations", $state.params.organizationId)
    //     .one("projects", $state.params.projectId)
    //     .post("getFromGit", data)
    //     .then(function(){
    //       $state.reload();
    //     })
    // })
  }

  public addNewTest = function () {
    this.isSaving = true;
    if (this.newTest.fileType === 'upload') {
      var formData = new FormData();
      var files = $('#jmx-file-upload')[0]['files'];
      if (!files || !files.length) {
        this.toastr.error('Please upload JMX file')
        return;
      }
      formData.append('jmxFile', files[0]);
      formData.append('fileName', files[0].name);
      formData.append('name', this.newTest.name);
      formData.append('description', this.newTest.description);
      this.OrganizationService.create(this.urlApi + "tests", formData).subscribe(data => {
        this.tests.push(data);
        this.isSaving = false;
        this.toastr.success('New test has been created.');
        this.changeShowingType('');
      })
    }else{
      this.OrganizationService.create(this.urlApi + "tests", this.newTest).subscribe(data => {
        this.tests.push(data);
        this.isSaving = false;
        this.toastr.success('New test has been created.');
        this.changeShowingType('');
      })
    }
  }

  public viewTest = function(item){
    this.router.navigate(['/project', item.projectId, item.id], {relativeTo: this.route}); 
  }  
}
