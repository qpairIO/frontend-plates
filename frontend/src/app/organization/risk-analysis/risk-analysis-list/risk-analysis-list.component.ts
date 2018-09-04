import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-analysis-list',
  templateUrl: './risk-analysis-list.component.html',
  styleUrls: ['./risk-analysis-list.component.scss']
})
export class RiskAnalysisListComponent implements OnInit {
	
  items: Array<any>;
  dtOptions: any;

  constructor() {
  	this.items = new Array(8);
  	this.dtOptions = {
	  lengthChange: false,
	  searching: false,
	  paging: false,
	  info: false,
	  columnDefs: [
	    {
		  targets:  [ 3 ],
		  orderable: false
		}
	  ]
    };

  
  }

  ngOnInit() {
  }

}
