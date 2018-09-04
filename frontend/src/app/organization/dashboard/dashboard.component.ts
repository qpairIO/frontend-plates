import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard.layout-column.flex',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardStats:any;
  loading:boolean;
  constructor() {
    this.dashboardStats = {
      projects: 16,
      users: 20,
      testResults: 19
    }
    this.loading = true;
  }

  ngOnInit() {
  }

  onViewLoad() {
  	this.loading = false;
  }


}
