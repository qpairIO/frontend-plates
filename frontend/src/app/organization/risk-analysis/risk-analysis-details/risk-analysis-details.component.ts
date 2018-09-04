import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-risk-analysis-details',
  templateUrl: './risk-analysis-details.component.html',
  styleUrls: ['./risk-analysis-details.component.scss']
})
export class RiskAnalysisDetailsComponent implements OnInit {
  loading: boolean;

  constructor() {
  	this.loading = true;
  }

  ngOnInit() {
  }

  onViewLoad() {
  	this.loading = false;
  }

}
