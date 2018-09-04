import { Component, OnInit } from '@angular/core';
import { GlobalSettings } from '../../../service/data.shared';
import { CONSTANT } from '../../../constants/constants.component';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'app-test-configuration',
  templateUrl: './test-configuration.component.html',
  styleUrls: ['./test-configuration.component.scss']
})
export class TestConfigurationComponent implements OnInit {

  public testConfig:any = {};
  public tests:any;
  public test:any;
  public global:any = {};


  constructor(private globalSettings: GlobalSettings, public sanitizer: DomSanitizer, public toastr: ToastrService, public router: Router, private route: ActivatedRoute) { 
  
  }

  ngOnInit() {
    //console.log(this.params)
    this.global.properties = CONSTANT.StaticParams.userdefinedProperties;
    this.tests = this.route.snapshot.parent!.data['tests'] || [];
    this.test = this.route.snapshot.parent!.data['test'];
    if(this.test && this.test.variables){
      this.global.parameters = _.values(this.test.variables);
    }
    // this.route.parent!.params.subscribe((params: Params) => {
    //   this.test = _.find(this.tests, function(test){
    //     return test.testId == params['testId'];
    //   });
    //   if(this.test){
    //     this.global.parameters = _.values(this.test.variables);
    //   } 
    // });
  }

  
  public addNewParameter = function () {
    this.global.parameters.push({
        name: '',
        value: '',
    });
  }
  public removeParameter = function (index) {
    _.remove(this.global.parameters, function (parameter, paramIndex) {
        return index == paramIndex;
    })
  };

  public onValueChange = function(item) {
    if (item.name === 'threadCount' && item.value > 100) {
      item.value = 100;
    }
  }

}
