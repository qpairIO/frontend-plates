import * as _ from 'lodash';
import {Component, OnInit, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-instance-crud',
  templateUrl: './instance-crud.component.html',
  styleUrls: ['./instance-crud.component.scss']
})
export class InstanceCrudComponent implements OnInit {
	providers: Array<string> = ['AWS', 'Google', 'Azure', 'Rackspace', 'SoftLayer', 'Private cloud'];
	data: { instances: Array<any>, providers: Array<any> } = { instances: [], providers: [] };
	selectedProviders: Array<any> = [];
  sliders: Array<any> = [];
	dtOptions: any;

  constructor() { }

  ngOnInit() {
  	this.dtOptions = {
    	lengthChange: false,
    	searching: false,
    	paging: false,
    	info: false
    };

    this.data.providers = _.map(this.providers, function(provider, idx) {
      return {
        id: idx + 1,
        name: provider,
        logo: '/assets/images/providers/' + provider.replace(/\s+/g, '').toLowerCase() + '.png',
      }
    });

    this.data.instances = [
      {
        provider: this.data.providers[0],
        instanceType: 't2.micro',
        cpus: 1,
        ram: 1,
        hdd: 0,
        hourlyCost: 0.013
      },
      {
        provider: this.data.providers[0],
        instanceType: 't2.small',
        cpus: 1,
        ram: 2,
        hdd: 0,
        hourlyCost: 0.026,
      },
      {
        provider: this.data.providers[0],
        instanceType: 't2.micro',
        cpus: 1,
        ram: 1,
        hdd: 0,
        hourlyCost: 0.013
      },
      {
        provider: this.data.providers[2],
        instanceType: 'small',
        cpus: 1,
        ram: 1.75,
        hdd: 70,
        hourlyCost: 0.6
      },
      {
        provider: this.data.providers[2],
        instanceType: 'medium',
        cpus: 1,
        ram: 1.75,
        hdd: 70,
        hourlyCost: 0.12
      },
      {
        provider: this.data.providers[0],
        instanceType: 'm1.small',
        cpus: 1,
        ram: 1.7,
        hdd: 0,
        hourlyCost: 0.044
      },
      {
        provider: this.data.providers[2],
        instanceType: 'large',
        cpus: 2,
        ram: 1.75,
        hdd: 70,
        hourlyCost: 0.24
      },
      {
        provider: this.data.providers[2],
        instanceType: 'extra small',
        cpus: 2,
        ram: 1.75,
        hdd: 70,
        hourlyCost: 0.015
      }
    ]

    this.sliders = [
      {
        name: 'vCPUs',
        minValue: 1,
        maxValue: 1,
        options: {
          step: 1,
          floor: 1,
          ceil: 16,
          from: 1,
          to: 1
        },
        translate: function(value) {
          return value;
        }
      },
      {
        name: 'RAM',
        minValue: 1,
        maxValue: 2,
        options: {
          step: 1,
          floor: 1,
          ceil: 256,
          from: 1,
          to: 2
        },
        translate: function(value) {
          return value + 'GB';
        }
      },
      {
        name: 'HDD',
        minValue: 500,
        maxValue: 4096,
        options: {
          step: 80,
          floor: 500,
          ceil: 4096,
          from: 500,
          to: 4096
        },
        translate: function(value) {
          if(value > 1024) {
              return (value%1024 === 0 ? value/1024: (value/1024).toFixed(2)) + 'TB'
          }
          return value + 'GB';
        }
      }
    ];

  }

  onSliderChange(e, slider) {
    slider.minValue = e.from;
    slider.maxValue = e.to;
  }

  selectProvider(provider) {
    let idx = _.findIndex(this.selectedProviders, function(p) {
      return p.id === provider.id;
    });
    if(idx === -1) {
      this.selectedProviders.push(provider);
    } else {
      this.selectedProviders.splice(idx, 1);
    }
  }

  isSelected(provider) {
    return _.find(this.selectedProviders, function(p) {
      return p.id === provider.id;
    });
  }

  dollar() {
  	return '&dollar;';
  }

}
