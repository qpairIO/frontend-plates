import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../organization-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import {UserStore} from '../../user/user.store';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-ha-testing',
  templateUrl: './ha-testing.component.html',
  styleUrls: ['./ha-testing.component.scss']
})
export class HaTestingComponent implements OnInit {
  public projects:Array<Object>;
  public showHeatmap:boolean;
  public applications:any;
  public failures:any;
  public regions:any;
  public urlApi:any;
  public elbs:any;
  public options:any;
  public newInstanceNumber:any;
  public actions:any;

  constructor(public OrganizationService: OrganizationService, public userStore:UserStore, public toastr: ToastrService, public router:Router, private route: ActivatedRoute,) { 
    this.showHeatmap = false;
    
    this.failures = ['Select Failure', 'Network Failure', 'Disk Failure', 'Stop instance', 'Start instance', 'Network Throttling'];
    this.regions = ['us-east-1a', 'us-east-1b', 'us-west-1a'];
    this.elbs = [
      {name: 'ELB1', status:'notstopped', instances:[{name: 'instance 1', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Select Failure'}, {name: 'instance 2', status: 'stopped', action:'start',  actionLabel:'Apply',failure: 'Select Failure'}, {name: 'instance 3', status: 'stopped', action:'start', actionLabel:'Apply', failure: 'Network Failure'}] },
      {name: 'ELB2', status:'stopped', instances:[{name: 'instance 1', status: 'stopped', action:'start', actionLabel:'Apply', failure: 'Disk Failure'}, {name: 'instance 2', status: 'stopped', action:'start', actionLabel:'Apply', failure: 'Network Failure'}, {name: 'instance 3', status: 'stopped', action:'start', actionLabel:'Apply', failure: 'Network Failure'}] },
      {name: 'DB', status:'running', instances:[{name: 'instance 1', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Select Failure'}, {name: 'instance 2', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Network Failure'}, {name: 'instance 3', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Network Failure'}] },
      {name: 'Queue', status:'running', instances:[{name: 'instance 1', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Select Failure'}, {name: 'instance 2', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Network Failure'}, {name: 'instance 3', status: 'running', action:'stop', actionLabel:'Apply', failure: 'Network Failure'}] }
    ];
    this.options = { list: ['Stack', 'Clustur', 'Applications'], name: '', applicationName:'',  projectId: null, testId: null, finishedRuntest:false, disabledSelectTest:true, runningTest:false };
    this.newInstanceNumber = 4;
    this.actions = [];
  }

  ngOnInit() {
    this.applications = this.route.snapshot.data['projects'].rows || [];
    this.urlApi = "organizations/"+ this.userStore.user.value.organizationId +"/projects/";
  }

  public updateOption = function(){
    if(this.options.name != 'Applications' ){
      this.options.applicationName = '';
    }
  }

  public selectApplication = function(projectId){
    this.options.testId = null;
    this.options.projectId = projectId;
    this.options.application = _.find(this.applications,{id: this.options.projectId});
    this.OrganizationService.get(this.urlApi+ this.options.projectId + "/tests").subscribe(project => {
        this.tests = project.rows;
        this.options.disabledSelectTest = false;
    });
  }
  
  public runTest = function(){
    this.options.runningTest = true;
    this.options.finishedRuntest = true;
    this.toastr.info('test is running');
    this.actions.push('Select run test');
    var self = this;
    setTimeout(function(){
      self.options.disabledSelectTest = false;
      self.options.runningTest = false;
    },10000);
  }
  
  public stopTest = function(){
    this.toastr.info('test is stopped');
    this.actions.push('Select stop test');
    this.options.runningTest = false;
  }
  
  public selectFailure = function(failure, instance){
    instance.failure = failure;
    this.actions.push('Select ' + failure);
  }

  public selectTest = function(testId){
    this.options.testId = testId;
  }
  
  public downloadReport = function(){
    var date = moment().format('YYYY-MM-DD HH:mm:ss');
    var name = this.options.application.name;
    var doc = new jsPDF();
    var content = '';
    _.each(this.actions, function(action){
      content+= action+"\n";
    });
    doc.text(content, 10, 10);
    doc.save('Report ' + name + ' '+ date +'.pdf');
  };
  
  public changeAction = function(indexElb, indexInstance){
    // this.checkInstance = _.filter(this.elbs[indexElb].instances, function(ins){
    //   return ins.status == 'stopped';
    // });
    // if(this.checkInstance.length + 1 == this.elbs[indexElb].instances.length && this.elbs[indexElb].instances[indexInstance].action == 'stop'){
    //   return ;
    // }
    if(!this.elbs[indexElb].instances[indexInstance].failure || this.elbs[indexElb].instances[indexInstance].failure == 'Select Failure'){
      this.toastr.error('Please select an action to apply');
      return;
    }
    this.elbs[indexElb].instances[indexInstance].actionLabel = 'Applying';
    if (this.elbs[indexElb].instances[indexInstance].failure != 'Stop instance' && this.elbs[indexElb].instances[indexInstance].failure != 'Start instance' ){
      this.toastr.info('Applying ' + this.elbs[indexElb].instances[indexInstance].failure + ' action on ' + this.elbs[indexElb].instances[indexInstance].name+ ' in '+ this.elbs[indexElb].name);
      this.actions.push('Applying ' + this.elbs[indexElb].instances[indexInstance].failure + ' action on ' + this.elbs[indexElb].instances[indexInstance].name+ ' in '+ this.elbs[indexElb].name);
    }else if(this.elbs[indexElb].instances[indexInstance].failure ==  'Stop instance'){
      this.toastr.info('Stopping the instance');
      this.actions.push('Stopping the instance');
    }else if(this.elbs[indexElb].instances[indexInstance].failure ==  'Start instance'){
      this.toastr.info('Starting the instance');
      this.actions.push('Starting the instance');
    }
    var self = this;
    setTimeout(function(){
      if (self.elbs[indexElb].instances[indexInstance].failure == 'Stop instance' || self.elbs[indexElb].instances[indexInstance].failure == 'Start instance' ){
        if(self.elbs[indexElb].instances[indexInstance].status == 'running'){
          self.elbs[indexElb].instances[indexInstance].status = 'stopped';
          self.elbs[indexElb].instances[indexInstance].action = 'start';
        }else{
          self.elbs[indexElb].instances[indexInstance].status = 'running';
          self.elbs[indexElb].instances[indexInstance].action = 'stop';
        }
      }
      
      self.elbs[indexElb].instances[indexInstance].actionLabel = 'Apply';
      self.checkInstanceRunning = _.filter(self.elbs[indexElb].instances, function(ins){
        return ins.status == 'running';
      });
      
      self.checkInstance = _.filter(self.elbs[indexElb].instances, function(ins){
        return ins.status == 'stopped';
      });
      
      self.elbs[indexElb].status = 'notstopped';
      if(self.checkInstanceRunning.length == self.elbs[indexElb].instances.length){
        self.elbs[indexElb].status = 'running';
      }else if(self.checkInstance.length == self.elbs[indexElb].instances.length){
        self.elbs[indexElb].status = 'stopped';
      }
      if (self.elbs[indexElb].instances[indexInstance].failure != 'Stop instance' && self.elbs[indexElb].instances[indexInstance].failure != 'Start instance' ){
        self.elbs[indexElb].status = 'stopped';
      }
    },15000);
    
  };

}
