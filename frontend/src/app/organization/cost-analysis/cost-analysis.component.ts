import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddReservedInstanceComponent } from './../add-reserved-instance/add-reserved-instance.component';
import { InstanceCrudComponent } from './../instance-crud/instance-crud.component';
 
@Component({
  selector: 'app-cost-analysis.layout-column.flex',
  templateUrl: './cost-analysis.component.html',
  styleUrls: ['./cost-analysis.component.scss']
})
export class CostAnalysisComponent implements OnInit {
	data: { instances: Array<any>, patterns: Array<any> } = {instances: [], patterns: []};
	model: {
		instanceMode: any,
		patterns: Array<any>,
    reservedInstances: Array<any>,
    instance: any
	} = {
		instanceMode: 'onDemandInstances',
		patterns: [],
    reservedInstances: [],
    instance: {},
	};

	dtOptions: any;

  constructor(
  	private modalService: NgbModal
  ) {}

  ngOnInit() {
  	this.data.instances = [
      {
        cloudVendor: 'Google',
        cloud: 'us-central1-b',
        instanceType: 'n1-standard-4',
        operatingSystem: 'Linux/UNIX',
        quantity: 3
      }
    ];

    this.data.patterns = [
      {
        title: '+1/mo',
        description: 'Add 1 every month'
      },
      {
        title: '+10%/mo',
        description: 'Increase by 10% every month'
      },
      {
        title: '+15%/mo',
        description: 'Increase by 10% every month'
      },
      {
        title: '+12%/mo',
        description: 'Increase by 10% every month'
      }
    ];

    this.model.instance = this.data.instances[0];

    this.dtOptions = {
    	lengthChange: false,
    	searching: false,
    	paging: false,
    	info: false,
    	columnDefs: [
    		{
    			targets: [ 5 ],
    			orderable: false
    		}
    	]
    };
  }

  addPattern(pattern) {
  	this.model.patterns.push(pattern)
  }

  addReservedInstance() {
  	const modalRef = this.modalService.open(AddReservedInstanceComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'AddReservedInstance';
    modalRef.componentInstance.instance = this.model.instance;
    modalRef.result.then((instance) => {
    	this.model.reservedInstances.push(instance)
    }, (reason) => console.log('Modal cancel'));
  }

  crudInstance() {
  	const modalRef = this.modalService.open(InstanceCrudComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'InstanceCrud';
    modalRef.result.then((result) => {
    	this.model.reservedInstances.push(result)
    }, (reason) => console.log('Modal cancel'));
  }

}
