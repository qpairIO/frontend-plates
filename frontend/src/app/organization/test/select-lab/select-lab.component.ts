import { Component, OnInit, Inject } from '@angular/core';
import { OrganizationService } from '../../organization-service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CONSTANT } from '../../../constants/constants.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import * as moment from 'moment';
import * as _ from "lodash";
import { ToastrService } from 'ngx-toastr';
import { Http } from '@angular/http';
import { GlobalSettings } from '../../../service/data.shared';

@Component({
  selector: 'app-select-lab',
  templateUrl: './select-lab.component.html',
  styleUrls: ['./select-lab.component.scss']
})
export class SelectLabComponent implements OnInit {
  public grids:any;
  public global:any = {};

  constructor(public OrganizationService: OrganizationService, public toastr: ToastrService, public router:Router, 
    private route: ActivatedRoute, public dialog: MatDialog, private globalSettings: GlobalSettings) { 
      let data = this.globalSettings.getValue();
      if(data && data.grid){
        this.global.selectedGridId = data.grid.id;
      }else{
        this.global.selectedGridId = null;
      }
    }

  ngOnInit() {
    this.grids = this.route.snapshot.parent!.data['grids'].rows || [];
    this.global.currentStepName = 'Select Grid';
    
  }

  public changeGrid = function (grid) {
    if (grid.id) this.global.selectedGridId = grid.id;
    //this.global.selectedGrid = grid;
    if (this.global.selectedGrid && this.global.selectedGrid.status) {
      this.toastr.error('Grid is busy , please check back after some time to run the test');
      this.global.selectedGrid = {};
      this.global.selectedGridId = null;
    }else{
      this.globalSettings.updateValue({grid:grid});
    }
  }


  public viewInstances = function (grid) {
    grid.viewInstances = !grid.viewInstances;
  }

}
