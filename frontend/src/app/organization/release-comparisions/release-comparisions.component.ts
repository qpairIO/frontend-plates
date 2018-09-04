import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

declare let d3:any;

@Component({
  selector: 'app-release-comparisions.layout-column.flex',
  templateUrl: './release-comparisions.component.html',
  styleUrls: ['./release-comparisions.component.scss']
})
export class ReleaseComparisionsComponent implements OnInit {
  projects: Array<any>;
  apis: Array<any>;
  releases: Array<any>;
  tests: Array<any>;
  project: any;
  api: any;
  test: any;
  release1: any;
  release2: any;
  chartTypes: Array<any>;
  chartDatas: Array<any> = [];
  showChart: boolean;

  constructor() {
  	this.projects = ['Consensus', 'Ideabox','Datadontix','17Minds','MIT Living Labs'];
  	this.apis = ['All','Login','AddCommunity','ShareIdea'];
    this.tests = ['Baseline','Smoke','Load','Soak','HA testing'];
    this.releases = ['Release 1.0','Release 2.0','Release 3.0'];
    this.chartTypes = ['Response Times', 'DB Connections', 'CPU Utilization', 'Memory Utilization', 'Network Utilization', 'Throughput', 'Messages/Sec', 'Events/Sec'];

    this.chartDatas = this.getChartData();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  compare() {
    this.showChart = true;
  }

  getChartOptions(_options) {
    let options = _options || {};
    return {
      chart: {
          type: 'lineChart',
          height: 300,
          margin : {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
          },
          x: function(d){ return d.x; },
          y: function(d){ return d.y; },
          useInteractiveGuideline: true,
          dispatch: {
              stateChange: function(e){ console.log("stateChange"); },
              changeState: function(e){ console.log("changeState"); },
              tooltipShow: function(e){ console.log("tooltipShow"); },
              tooltipHide: function(e){ console.log("tooltipHide"); }
          },
          xAxis: {
              axisLabel: options.xAxisLabel || 'X Axis',
              tickValues: options.xTickValues || null,
              tickFormat: options.xTickFormat || null
          },
          yAxis: {
              axisLabel: options.yAxisLabel || 'Y Axis',
              tickFormat: (d) => {
                  return d3.format('.01f')(d);
              },
              axisLabelDistance: -10
          },
          callback: function(chart){
              console.log("!!! lineChart callback !!!");
          }
      }
    };
  }

  getChartData() {
    let _default:any
    _default = [
      {
        series: [
          {
            name: 'Release 1.0',
            data: [65, 59, 60, 69, 56, 55, 40],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [62, 55, 62, 65, 50, 53, 43],
            color: '#DCDCDC',
          }
        ],
        xAxis: ['01:00','02:00','03:00','04:00','05:00','06:00','07:00'],
        xAxisLabel: 'Elapsed Time(Seconds)',
        yAxisLabel: 'Average Response Time(Seconds)'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [31, 30, 31, 31, 31, 30, 30],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [30, 30, 31, 30, 30, 30, 31],
            color: '#DCDCDC',
          }
        ],
        xAxis: ['Tue 12:00','Wed 12:00','Thu 12:00','Fri 12:00','Sat 12:00','Sun 12:00','Mon 12:00'],
        yxAxisLabel: 'Connections',
        xAxisLabel: 'Per Day'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [85, 65, 70, 94, 32, 83, 15],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [88, 60, 77, 96, 30, 85, 20],
            color: '#DCDCDC',
          }
        ],
        xAxis: [0, 10, 20, 30, 40, 50, 60],
        yAxisLabel: 'CPU Utilization(Percent)',
        xAxisLabel: 'Time(Milliseconds)'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [660, 650, 680, 700, 700, 620, 600],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [660, 652, 682, 720, 710, 600, 500],
            color: '#DCDCDC',
          }
        ],
        xAxis: [0, 10, 20, 30, 40, 50, 60],
        yAxisLabel: 'Memory Usage(Miliseconds)',
        xAxisLabel: 'Time(Minutes)'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [0.5, 4.0, 3.5, 1.0, 4.1, 2.0, 5.0],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [0.4, 3.0, 3.5, 1.5, 4.0, 1.5, 4.0],
            color: '#DCDCDC',
          }
        ],
        xAxis: [0, 10, 20, 30, 40, 50, 60],
        xAxisLabel: 'Time(Seconds)',
        yAxisLabel: 'GiB Sent and Received'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [60, 42, 50, 10, 60, 10, 90],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [60, 41, 48, 11, 59, 11, 85],
            color: '#DCDCDC',
          }
        ],
        xAxis: [0, 100, 200, 300, 400, 500, 600],
        xAxisLabel: 'Time(Seconds)',
        yAxisLabel: 'Throughput (MBps)'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [6010,6020,6005, 6002, 6200, 6300, 6300],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [6010,6020,6005, 6001, 6200, 6301, 6301],
            color: '#DCDCDC',
          }
        ],
        xAxis: ['01:00','02:00','03:00','04:00','05:00','06:00','07:00'],
        xAxisLabel: 'Elapsed Time(Seconds)',
        yAxisLabel: 'Messages/Seconds'
      },

      {
        series: [
          {
            name: 'Release 1.0',
            data: [100, 300, 630, 440, 740, 700, 400],
            color: '#98BBCC',
          },
          {
            name: 'Release 2.0',
            data: [150,350,600, 434, 742, 707, 404],
            color: '#DCDCDC',
          }
        ],
        xAxis: ['07.00', '08.00', '09.00', '10.00', '11.00', '12.00', '13.00'],
        xAxisLabel: 'Average EPS over the last hour(on 11/06/2017)',
        yAxisLabel: 'Events/Seconds'
      }

    ];

    let chartDatas:Array<any>;

    chartDatas = _default.map((chart) => {

        let series:Array<any> = chart.series.map((series) => {
           let key:string = series.name;
           let color: string = series.color;
           let values:Array<any> = _.map(series.data, (point, idx) => {
             return {
               x: idx,
               y: point
             }
           });
           series.values = values;
           series.color = color;
           series.key = key;
           series.area = true;
           return _.pick(series, ['key', 'values', 'color', 'area']);
        });

        chart.data = series;

        let options = _.pick(chart, 'xAxisLabel', 'yAxisLabel');
        options.xTickValues = chart.xAxis.map((item, idx) => idx);
        options.xTickFormat = (d) => {
          return chart.xAxis[d];
        }

        chart.options = this.getChartOptions(options);

        return _.pick(chart, ['data', 'options']);

    });

    return chartDatas;

  }

}
