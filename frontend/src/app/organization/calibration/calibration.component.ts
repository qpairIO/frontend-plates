import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import StatsService from './../stats.service';

@Component({
  selector: 'app-calibration.layout-column.flex',
  templateUrl: './calibration.component.html',
  styleUrls: ['./calibration.component.scss']
})
export class CalibrationComponent implements OnInit {
  providers: Array<any> = [];
  models: any;
  result: any;
  cValue: string;
  kValue: string;
  mValue: string;
  service: { valueInSec: any, value: any, unit: any, firstUnit: any, converter: any };
  arrival: { valueInSec: any, value: any, unit: any, firstUnit: any, converter: any };
  units: Array<any>;
  loadMix: Array<any>;
  model: any;
  selectedProviders: Array<any>;
  runningTest: Boolean = false;
  testResult: any;
  step: number;
  selectedModelId:number;
  selectedModel: any;
  calculated: Boolean = false;
  results: Array<any>;
  constructor(
    private statsService: StatsService
  ) {
    const providers = ['AWS', 'Google', 'Azure', 'Rackspace', 'SoftLayer', 'Private cloud'];
    this.providers = _.map(providers, function(provider, idx) {
      return {
        id: idx + 1,
        name: provider,
        logo: '/assets/images/providers/' + provider.replace(/\s+/g, '').toLowerCase() + '.png',
      }
    });
    this.result = {};
    this.cValue = '';
    this.units = [
      {
        key: 'no-unit',
        name: 'No Units',
        shortName: 'No Units'
      },
      {
        key: 'day',
        name: 'Customers/Day',
        shortName: 'Cust/Day'
      },
      {
        key: 'hour',
        name: 'Customers/Hour',
        shortName: 'Cust/Hour'
      },
      {
        key: 'minute',
        name: 'Customers/Minute',
        shortName: 'Cust/Minute'
      },
      {
        key: 'second',
        name: 'Customers/Second',
        shortName: 'Cust/Second'
      }
    ];
    this.service = {
      value: 0,
      unit: this.units[2], // ['day', 'hour', 'min', 'sec'],
      converter: this.units[1],
      firstUnit: 'hour',
      valueInSec: 0
    };
    this.arrival = {
      value: 0,
      unit: this.units[2], // ['day', 'hour', 'min', 'sec'],
      converter: this.units[1],
      firstUnit: 'hour',
      valueInSec: 0
    }
    this.loadMix = [
      {
        name: '',
        percent: ''
      }
    ];
    this.model = {
      selectedTest: 'test1',
      loadMix: []
    };
    this.selectedModel = {};
    this.selectedProviders = [];
    this.testResult = {};
    this.step = 1;
  }

  ngOnInit() {
    this.models = [
      {
        id: 1,
        provider: this.providers[0],
        instanceType: 'M4xlarge',
        style: {
          color: '#fff',
          background: 'green'
        },
        title: 'M/M/C',
        description: 'Single queue, C servers.',
        selected: false,
        hasC: true,
        hasK: false,
        hasM: false,
        calculatorFn: this.MMC.bind(this)
      },
      {
        id: 2,
        provider: this.providers[1],
        instanceType: 'N1 Standard',
        style: {
          color: '#fff',
          background: 'green'
        },
        title: 'M/M/Inf',
        description: 'At least one server per customer.',
        selected: false,
        hasC: false,
        hasK: false,
        hasM: false,
        calculatorFn: this.MMInf.bind(this)
      },
      {
        id: 3,
        provider: this.providers[2],
        instanceType: 'DS12_V2',
        style: {
          color: '#000',
          background: 'yellow'
        },
        title: 'M/M/C/K',
        description: 'Queue can only hold K customers.',
        selected: false,
        hasC: true,
        hasK: true,
        hasM: false,
        calculatorFn: this.MMCK.bind(this)
      }
    ];

    this.results = [
      {
        value: 'L',
        color: '#f56954',
        unit: 'Customers',
        type: 'L',
        title: 'Average Customers in System',
        description: 'Average number of customers in the system.'
      },
      {
        value: 'Lq',
        color: '#00c0ef',
        unit: 'Customers',
        type: 'Lq',
        title: 'Average Customers in Queue',
        description: 'Average number of customers (entities) in the queue. In other words the expected amount of customers waiting to be served.'
      },
      {
        value: 'W',
        color: '#0073b7',
        unit: 'Hours',
        type: 'W',
        title: 'Average Time Spent in System',
        description: 'Average time spent by a customer from arrival until fully served.'
      },
      {
        value: 'Wq',
        color: '#00b29e',
        unit: 'Hours',
        type: 'Wq',
        title: 'Average Time Waiting in Line',
        description: 'Average time it takes a customer to start being served.'
      },
      {
        value: 'Ro',
        color: '#ba79cb',
        unit: 'Customers',
        type: 'ρ',
        title: 'Server Utilization',
        description: 'Percentage of time a server is being utilized by a customer.'
      },
      {
        value: 'Lambdap',
        color: '#ba79cb',
        unit: '',
        type: `λ'`,
        title: 'Lambda prime',
        description: 'A value used in some calculations.'
      },
    ];
  }

  addLoadMix() {
    this.loadMix.push({
      name: '',
      percent: ''
    });
  }

  removeLoadMix($index) {
    this.loadMix.splice($index, 1);
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
    if(!provider) return false;
    return _.find(this.selectedProviders, function(p) {
      return p.id === provider.id;
    });
  }

  runTest() {
    if(this.runningTest || !this.selectedProviders.length) return false;
    this.step = 1;
    this.testResult = {};
    this.runningTest = true;
    this.selectedModelId = 0;
    this.calculated = false;
    setTimeout(() => {
        var testResult = {};
        _.each(this.selectedProviders, function(p) {
           testResult[p.id] = 'm4.xlarge';
        });
        this.step++;
        this.testResult = testResult;
        this.runningTest = false;
    }, 5000);
  }

  selectModel(model) {
    this.selectedModelId = model.id;
    this.selectedModel = model;
  }

  updateArrival() {

  }

  updateValue(model) {
    switch(model.converter.key) {
      case 'day':
        model.valueInSec = (model.value*60*60*24);
        break;
      case 'hour':
        model.valueInSec = (model.value*60*60);
        console.log(model.converter.key);
        break;
      case 'minute':
        model.valueInSec = (model.value*60);
        console.log(model.converter.key);
        break;
      case 'second':
        model.valueInSec = model.value;
        console.log(model.converter.key);
        break;
    }
    console.log(this);
  }

  convertUnit(event, model) {
    console.log(event, model);
    model.unit = _.merge({}, event);
    model.converter = _.merge({}, event);
    switch(model.converter.key) {
      case 'day':
        model.value = (model.valueInSec/60/60/24);
        break;
      case 'hour':
        model.value = (model.valueInSec/60/60);
        console.log(model.converter.key);
        break;
      case 'minute':
        model.value = (model.valueInSec/60);
        console.log(model.converter.key);
        break;
      case 'second':
        model.value = model.valueInSec;
        console.log(model.converter.key);
        break;
    }
  }

  calculate() {
    this.calculated = true;
    this.result.Po = 0;
    this.result.L = 0;
    this.result.Lq = 0;
    this.result.W = 0;
    this.result.Wq = 0;
    this.result.Ro = 0;
    this.selectedModel.calculatorFn && this.selectedModel.calculatorFn();
  }

  MMC() {
    console.log(this);
    let Lambda = this.arrival.valueInSec / 3600;
    let Mu = this.service.valueInSec / 3600;
    let c = Number(this.cValue);
    let r = Lambda / Mu;
    let cp = c + 1;
    let cx = 1 - r / c;
    let Stats = this.statsService;

    this.result.Ro = Lambda / (c * Mu);

    this.result.Po = 0;
    for (var i = 0; i < c; i++) {
      this.result.Po += Stats.power(r, i) / Stats.factorial(i);
    }
    this.result.Po += (c * Stats.power(r, c)) / (Stats.factorial(c) * (c - r));
    this.result.Po = Stats.power(this.result.Po, -1);

    this.result.Lq = Stats.power(r, cp) * this.result.Po / (Stats.factorial(c) * c * Stats.power(cx, 2));

    this.result.Wq = this.result.Lq / Lambda;

    this.result.L = r + (this.result.Po * Stats.power(r, cp)) / (c * Stats.factorial(c) * Stats.power(cx, 2));

    this.result.W = this.result.L / Lambda;
  }

  MMInf() {
    let Lambda = this.arrival.valueInSec / 3600;
    let Mu = this.service.valueInSec / 3600;
    let r = Lambda / Mu;
    this.result.W = 1 / Mu;
    this.result.L = r;

    this.result.Ro = 0;
    this.result.Wp = 0;
    this.result.Lq = 0;
  }

  MMCK() {
    let Lambda = this.arrival.valueInSec / 3600;
    let Mu = this.service.valueInSec / 3600;
    let c = Number(this.cValue);
    let k = Number(this.kValue);
    let r = Lambda / Mu;
    let i = 0;
    let Stats = this.statsService;

    this.result.Ro = Lambda / (c * Mu);
    if (this.result.Ro !== 1) {
      for (i = 0, this.result.Po = 0; i <= c - 1; i++) {
        this.result.Po += Stats.power(r, i) / Stats.factorial(i);
      }
      this.result.Po += Stats.power(r, c) * (1 - Stats.power(this.result.Ro, k - c + 1)) / (Stats.factorial(c) * (1 - this.result.Ro));
      this.result.Po = Stats.power(this.result.Po, -1);
    } else {
      for (i = 0; i <= c - 1; i++) {
        this.result.Po += Stats.power(r, i) / Stats.factorial(i);
      }
      this.result.Po += Stats.power(r, c) * (k - c + 1) / (Stats.factorial(c));
      this.result.Po = Stats.power(this.result.Po, -1);
    } if (this.result.Ro !== 1) {
      this.result.Lq = this.result.Po * Stats.power(c * this.result.Ro, c) * this.result.Ro * (1 - Stats.power(this.result.Ro, k - c + 1) - (1 - this.result.Ro) * (k - c + 1) * Stats.power(this.result.Ro, k - c)) / (Stats.factorial(c) * Stats.power(1 - this.result.Ro, 2));
    } else {
      this.result.Lq = this.result.Po * Stats.power(c, c) * (k - c) * (k - c + 1) / (2 * Stats.factorial(c));
    }
    for (i = 0; i <= c - 1; i++) {
      this.result.L = (c - i) * Stats.power(this.result.Ro * c, i) / Stats.factorial(i);
    }
    this.result.L *= -this.result.Po;
    this.result.L += this.result.Lq + c;

    if (k === 0) {
      this.result.Pk = this.result.Po;
    } else if (1 <= k && k <= c) {
      this.result.Pk = Stats.power(r, k) * this.result.Po / Stats.factorial(k);
    } else {
      this.result.Pk = Stats.power(r, k) * this.result.Po / (Stats.factorial(c) * Stats.power(c, k - c));
    }
    this.result.Lambdap = Lambda * (1 - this.result.Pk);
    this.result.W = this.result.L / this.result.Lambdap;
    this.result.Wq = this.result.W - 1 / Mu;
  }

  MMCM() {
    let Lambda = this.arrival.valueInSec / 3600;
    let Mu = this.service.valueInSec / 3600;
    let c = Number(this.cValue);
    let k = Number(this.kValue);
    let m = Number(this.mValue);
    let r = Lambda / Mu;
    let Stats = this.statsService;

    for (var i = 0, Po_1 = 0; i < c; i++) {
      Po_1 += Stats.combination(m, i) * Stats.power(r, i);
    }
    for (var i = c, Px = 0; i <= m; i++) {
      Px += Stats.combination(m, i) * Stats.factorial(i) * Stats.power(r, i) / (Stats.power(c, i - c) * Stats.factorial(c));
    }
    this.result.Po = 1 / (Po_1 + Px);

    for (var i = 0; i <= c - 1; i++) {
      this.result.L += i * Stats.combination(m, i) * Stats.power(r, i);
    }
    for (var i = c; i <= m; i++) {
      this.result.L += i * Stats.combination(m, i) * Stats.power(r, i) * Stats.factorial(i) / (Stats.power(c, i - c) * Stats.factorial(c));
    }
    this.result.L *= this.result.Po;

    for (var i = 0; i <= c - 1; i++) {
      this.result.Lq += (c - i) * Stats.combination(m, i) * Stats.power(r, i);
    }
    this.result.Lq *= this.result.Po;
    this.result.Lq = this.result.Lq + this.result.L - c;
    this.result.W = this.result.L / (Lambda * (m - this.result.L));
    this.result.Wq = this.result.Lq / (Lambda * (m - this.result.L));
    this.result.Lambdap = this.result.Mu * (this.result.L - this.result.Lq);
  }

}
