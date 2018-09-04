import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment-timezone';
import * as _ from 'lodash';

declare let nv: any;
declare let d3: any;

@Component({
  selector: 'app-usage-model-analysis.layout-column.flex',
  templateUrl: './usage-model-analysis.component.html',
  styleUrls: ['./usage-model-analysis.component.scss']
})

export class UsageModelAnalysisComponent implements OnInit {
	@ViewChild('usageModelForm') usageModelForm: ElementRef;
	period: Array<any>;
	timezones: Array<any>;
	peakTime: any;
	model: any;
  timePicker: Array<any> = [];
  chart:any;


  constructor() {
  	this.timezones = moment.tz.names();
  	this.period = [
	    {
	      name: 'day',
	      value: 1,
	      values: [ 'everyday' ]
	    },
	    {
	      name: 'week',
	      value: 7,
	      values: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
	      weekdays: moment.weekdays()
	    }
  	];
  	this.peakTime = { startTime: moment().startOf('day'), timezone: 'America/New_York', duration: '',  period: '' };
  	this.model = {
	    minAveragePeakLoad: 0,
	    averagePeakLoad: '',
	    noOfUsers: '',
	    period: this.period[0],
	    peakTimes: []
	  };
  }

  ngOnInit() {
  	this.addPeakTime();
    this.modelChange();
  }

  addPeakTime() {
    this.model.peakTimes.push(_.defaults({ period:  this.model.period.values[0] }, this.peakTime));
    this.timePicker.push('00:00');
  }

  removePeakTime($index) {
    this.model.peakTimes.splice($index, 1);
    this.timePicker.splice($index, 1);
  }

  getFormControl(form, name) {
  	return _.find(form._directives, directive => {
  		return directive.name === name;
  	})
  }

  modelChange() {
  	let form = this.usageModelForm;
  	let noOfUsers = this.getFormControl(form, 'noOfUsers');
  	let period = this.getFormControl(form, 'period');
  	let averagePeakLoad = this.getFormControl(form, 'averagePeakLoad');
  	form['submitted'] = true;
    if(noOfUsers && noOfUsers.valid && period && period.valid) {
     	this.model.minAveragePeakLoad = (this.model.noOfUsers / (this.model.period.value * 24)).toFixed(2);
    } else {
     	this.model.minAveragePeakLoad = 0;
    }
    if(noOfUsers && noOfUsers.valid && averagePeakLoad && averagePeakLoad.valid) {
      this.calculateRPS(this.model.peakTimes, this.model.noOfUsers, this.model.averagePeakLoad / 3600);
    } else {
      this.calculateRPS(this.model.peakTimes, null, null);
    }
    console.log(this.model); 
    if(this.model && this.model.period) {
      this.renderChart();
    }
  }

  timePickerChange(i) {
    let hourArr = this.timePicker[i].split(':');
    this.model.peakTimes[i].startTime = moment().hour(hourArr[0]).minute(hourArr[1]).startOf('minute');
    this.modelChange();
  }

  calculateRPS(peakTimes, noOfUsers, noOfRequest) {
    if(!(peakTimes instanceof Array) || !peakTimes.length) return false;
    let value = (isNaN(noOfUsers) || isNaN(noOfRequest)) ? 0 : noOfUsers * noOfRequest;
    _.each(peakTimes, (pt) => {
      let rps = (isNaN(pt.duration) || !pt.duration || !value) ? 0 : value / (pt.duration * 60* 60);
      pt.rps = rps ? rps.toFixed(2) : 0;
    });
  }

  getXAxisData(period) {
    let min, max, unit, format, step = 1, values:Array<any> = [], item:any;
    switch (period) {
      case 'day':
        min = moment().startOf('day').startOf('hour');
        max = moment().endOf('day').endOf('hour');
        unit = 'hour';
        format = 'HH:mm a';
        step = 2;
        break;
      case 'week':
        min = moment().startOf('week').add(1, 'day').startOf('day');
        max = moment().endOf('week').add(1, 'day').endOf('day');
        unit = 'day';
        format = 'dddd';
        break;
      case 'month':
        min = moment().startOf('year').startOf('month');
        max = moment().endOf('year').endOf('month');
        unit = 'month';
        format = 'MMMM';
        break;
      case 'year':
        min = moment().startOf('year');
        max = moment().add(12, 'year').endOf('year');
        unit = 'year';
        format = 'YYYY';
        break;
      default:
        return false;
    }
    item= min.clone();
    while(item < max) {
      values.push(item.clone().toDate());
      item.add(step, unit);
    };
    return { min: min, max: max, step: step, unit: unit, format: format, values: values};
  }

  renderChart() {
    let xAxis:any, 
      options:any = this.defaultOptions(), 
      data:{key: any, values:Array<any>, color: any, stroke: number, area: boolean} = this.defaultRPSData(), 
      values:Array<any> = [];
    xAxis = this.getXAxisData(this.model.period.name);
    if(!xAxis) return false;

    let minAveragePeakLoad = this.model.minAveragePeakLoad ? parseFloat(this.model.minAveragePeakLoad) : 0;
    minAveragePeakLoad /= 3600;

    options.chart.xDomain = [xAxis.min, xAxis.max];
    options.chart.xAxis.tickFormat = (d) => {
      return moment(d).format(xAxis.format);
    };
    options.chart.xAxis.tickValues = xAxis.values;

    let peakTimes = _.reduce(this.model.peakTimes, (results, pt) => {
      if(!pt.duration || isNaN(pt.duration)) pt.duration = 0;
      pt.duration = parseFloat(pt.duration);
      pt.endTime = moment(pt.startTime).add(pt.duration, 'hour');
      if(pt.duration) results.push(pt);
      return results;
    }, []);

    let defaultTime = xAxis.min.clone();
    let hasMin, hasMax;
    values = [{ x: xAxis.min, y: minAveragePeakLoad, begin: true, min: true }, { x: xAxis.max, y: minAveragePeakLoad, end: true, max: true }];

    if(peakTimes.length) {
      peakTimes = _.uniq(_.orderBy(peakTimes, [(pt) => {
        return moment(pt.startTime).valueOf();
      }, 'duration'], ['asc', 'desc']), (pt) => {
        return moment(pt.startTime).valueOf();
      });
      _.each(peakTimes, (pt, index) => {
        let rps = parseFloat(pt.rps), points;
        if(rps) {
          let x = this.getXTime(defaultTime, pt);
          let x2 = x.clone().add(pt.duration, 'hour') > x.max ? x.max : x.clone().add(pt.duration, 'hour');
          points = [
            {
              x: x.clone(),
              y: rps,
              begin: true,
            },
            {
              x: x2,
              y: rps,
              end: true
            }
          ];

          if(peakTimes[index + 1]) {
            let nextX = this.getXTime(defaultTime, peakTimes[index + 1]);
            if(nextX > x2) {
              let apl = minAveragePeakLoad;
              let coverPeakTime = _.filter(peakTimes, (pt) => {
                return pt.rps && pt.startTime.valueOf() < x2.valueOf() && pt.endTime.valueOf() > nextX.valueOf();
              });
              if(coverPeakTime.length) {
                let closestPeakTime = _.max(coverPeakTime, 'startTime');
                apl = closestPeakTime.rps;
              }
              points.push({
                x: x2.clone().add(1, 'seconds'),
                y: apl,
                begin: true,
              }, {
                x: nextX.clone().subtract(1, 'seconds'),
                y: apl,
                end: true
              });
            }
          }
          let maxPoint = _.max(points, 'x');
          let minPoint = _.min(points, 'x');
          hasMax = hasMax || (maxPoint && maxPoint.x.valueOf() >= xAxis.max.valueOf());
          hasMin = hasMin || (minPoint && minPoint.x.valueOf() <= xAxis.min.valueOf());
        }
        Array.prototype.push.apply(values, points);
      });
    }
    _.remove(values, (point) => {
      return (hasMin && point.min) || (hasMax && point.max);
    });

    let max = _.maxBy(values, 'y')['y'];
    if(max > 0) {
      let yValues:Array<any> = [];
      let ticks = 5;
      let step = max / 5;
      max+=step*2;
      for(let i = 0;i < max; i+=step) {
        yValues.push(i);
      }
      options.chart.yDomain = [0, max];
      options.chart.yAxis.tickValues = yValues;
    }
    let sortValues = _.sortBy(values, (item) => {
      return item.x.valueOf();
    });
    let dataValues:Array<any> = [];
    for(let i=0;i < sortValues.length; i++) {
      let point = sortValues[i];
      let prevPoint = sortValues[i-1];
      let nextPoint = sortValues[i+1];
      if(i === 0) {
        let stepPoint = {
          x: nextPoint.x.clone(),
          y: point.y
        };
        sortValues.splice(1, 0, stepPoint);
        dataValues.push(point);
      }
      else if(point.y === prevPoint.y || point.x.valueOf() === prevPoint.x.valueOf()) dataValues.push(point);
      else {
        let stepPoint = {
          x: prevPoint.x.clone(),
          y: point.y
        };
        dataValues.push(stepPoint, point);
      }
    }

    data.values = dataValues;
    nv.addGraph(() => {
      this.chart = nv.models.lineChart();
      let _options  = options.chart;
      _.each(_options, (value, key) => {
        if(['xAxis', 'yAxis'].indexOf(key) !== -1) {
          _.each(_options[key], (v, k) => {
             this.chart[key][k](v)
          });
        } else {
           this.chart[key](value);
        }
      });

      d3.select('#usage-model-chart svg')   
        .datum([ data ])
        .call(this.chart);     
      nv.utils.windowResize(function() { this.chart.update() });
      return this.chart;
    });
  }

  defaultRPSData() {
    let time:number = 3600, values:any = [], data:{key: any, values:Array<any>, color: any, stroke: number, area: boolean};
    for(let i = 0; i<=time; i+=600) {
      let point = { x: i, y: -1 };
      values.push(point);
    }
    return {
      key: 'RPS',
      values: values,
      color: '#0093d9',
      stroke: 2,
      area: true
    }
  }

  defaultOptions() {
    return {
      chart: {
        margin: {
          top: 10,
          right: 20,
          bottom: 40,
          left: 50
        },
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        useInteractiveGuideline: true,
        yDomain: [0, 10],
        xDomain: [0, 3600],
        xAxis: {
          showMaxMin: false,
          tickPadding: 15,
          tickValues: [0, 600, 1200, 1800, 2400, 3000, 3600],
          tickFormat: this.convertTime
        },
        yAxis: {
          axisLabel: ' ',
          axisLabelDistance: 0,
          tickPadding: 15,
          showMaxMin: false,
          tickValues: [0, 2, 4, 6, 8, 10],
          tickFormat: this.numberFormat('')
        },
        showLegend: false,
        focusShowAxisX: false,
      }
    }
  }

  convertTime(time) {
    let secNum:any, hours:any, minutes:any, seconds:any;
    secNum = parseInt(time, 10); // don't forget the second param
    hours   = Math.floor(secNum / 3600);
    minutes = Math.floor((secNum - (hours * 3600)) / 60);
    seconds = secNum - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = '0' + hours;}
    if (minutes < 10) {minutes = '0' + minutes;}
    if (seconds < 10) {seconds = '0' + seconds;}
    return [hours, minutes, seconds].join(':');
  }

  numberFormat(suffix) {
    return function(d) {
      let output = d.toFixed(2);
      if(d >= 1000) {
          output = (d/1000).toFixed(2) + 'K'
      }
      if(d >= 1000000) {
          output = (d/1000000).toFixed(2) + 'M'
      }
      if(d >= 1000000000) {
          output = (d/1000000000).toFixed(2) + 'B'
      }
      return output + (suffix || '');
    }
  }

  getXTime(defaultTime, pt) {
    let startTime = moment(pt.startTime);
    let x, hour = startTime.hour(), minute = startTime.minute();
    if(this.model.period.name === 'day') {
      x = defaultTime.hour(hour).minute(minute);
    } else {
      let day = this.model.period.weekdays.indexOf(pt.period);
      x = defaultTime.day(day).hour(hour).minute(minute);
    }
    return x;
  }

}
