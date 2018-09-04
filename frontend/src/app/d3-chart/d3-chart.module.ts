import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { D3ChartComponent } from './d3-chart/d3-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [D3ChartComponent],
  exports: [D3ChartComponent]
})
export class D3ChartModule { }
