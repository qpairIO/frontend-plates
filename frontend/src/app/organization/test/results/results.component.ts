import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public grafanaSrcs = [{
    width: 16.6, panelId: 3
  },{
    width: 16.6, panelId: 12
  },{
    width: 16.6, panelId: 13
  },{
    width: 16.6, panelId: 14
  },{
    width: 16.6, panelId: 15
  },{
    width: 16.6, panelId: 20
  },{
    width: 25, panelId: 18
  },{
    width: 25, panelId: 19
  },{
    width: 25, panelId: 17
  },{
    width: 25, panelId: 16
  },{
    width: 33.3, panelId: 5
  },{
    width: 33.3, panelId: 1
  },{
    width: 33.3, panelId: 21
  },{
    width: 100, panelId: 11
  }];
  public resultImages:any = [];
  public grafanaUrl:any;

  constructor() { }

  ngOnInit() {
    //get resultImages in api below
    //Restangular.one('/api/v1').one('testRun', $stateParams.testRunId).one('results').get();
    this.resultImages = [];
    this.grafanaUrl = 'https://s3.amazonaws.com/loadswarmjmx/s3image.png';
  }
  
}
