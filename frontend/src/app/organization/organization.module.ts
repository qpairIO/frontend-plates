import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { MatRadioModule, MatSelectModule, MatCheckboxModule, MatCardModule, MatTableModule, MatToolbarModule, MatDatepickerModule, MatNativeDateModule, MatTooltipModule, MatExpansionModule, MatDialogModule  } from '@angular/material';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
import { BrowserModule } from '@angular/platform-browser';
import { D3ChartModule } from './../d3-chart/d3-chart.module';
import { CostAnalysisComponent } from './cost-analysis/cost-analysis.component';
import { CalibrationComponent } from './calibration/calibration.component';
import { HaTestingComponent } from './ha-testing/ha-testing.component';
import { UsageModelAnalysisComponent } from './usage-model-analysis/usage-model-analysis.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmazingTimePickerModule } from 'amazing-time-picker'
import { OrganizationService } from './organization-service';
import StatsService from './stats.service';
import { AddReservedInstanceComponent } from './add-reserved-instance/add-reserved-instance.component';
import { InstanceCrudComponent } from './instance-crud/instance-crud.component';
import { ProjectComponent } from './project/project.component';
import { TestResultStatusComponent } from './project/test-result-status.component';
import { NewProjectComponent } from './project/new-project/new-project.component';
import { ViewProjectComponent, DialogOverviewDialog } from './project/view-project/view-project.component';
import { FileUploadComponent } from './project/view-project/file-upload.component';
import { TestComponent } from './test/test.component';
import { SelectLabComponent } from './test/select-lab/select-lab.component';
import { ClientMetricComponent } from './test/client-metric/client-metric.component';
import { TestConfigurationComponent } from './test/test-configuration/test-configuration.component';
import { LogsComponent } from './test/logs/logs.component';
import { ResultsComponent } from './test/results/results.component';
import { ClientStatusComponent } from './test/client-status/client-status.component';
import { ServerMetricsComponent } from './test/server-metrics/server-metrics.component';
import { CustomSelectObjectComponent } from './custom-select-object/custom-select-object.component';
import { SafePipe } from '../pipe/safe.pipe';
import { EditorComponent } from './test/editor/editor.component';
import { RiskAnalysisComponent } from './risk-analysis/risk-analysis.component';
import { RiskAnalysisListComponent } from './risk-analysis/risk-analysis-list/risk-analysis-list.component';
import { RiskAnalysisDetailsComponent } from './risk-analysis/risk-analysis-details/risk-analysis-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { ReleaseComparisionsComponent } from './release-comparisions/release-comparisions.component';
import { TestResultsComponent } from './test-results/test-results.component';
import { CreateOrganizationComponent } from './create-organization/create-organization.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    DataTablesModule,
    MatRadioModule,
    MatCardModule,
    MatTableModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    IonRangeSliderModule,
    RouterModule,
    BrowserModule,
    MatToolbarModule,
    FormsModule,
    MatCheckboxModule,
    IonRangeSliderModule,
    AmazingTimePickerModule,
    D3ChartModule,
    MatSelectModule
  ],
  providers: [
    MatDatepickerModule,
    SafePipe
  ],
  declarations: [
    CostAnalysisComponent, CalibrationComponent, UsageModelAnalysisComponent, SafePipe,
    HaTestingComponent, AddReservedInstanceComponent, InstanceCrudComponent, ProjectComponent, TestResultStatusComponent,
    NewProjectComponent, ViewProjectComponent, FileUploadComponent, DialogOverviewDialog, TestComponent, SelectLabComponent,
    ClientMetricComponent, TestConfigurationComponent, LogsComponent, ResultsComponent, ClientStatusComponent, ServerMetricsComponent,
    CustomSelectObjectComponent,
    EditorComponent,
    RiskAnalysisComponent,
    RiskAnalysisListComponent,
    RiskAnalysisDetailsComponent,
    DashboardComponent,
    ReleaseComparisionsComponent,
    TestResultsComponent,
    CreateOrganizationComponent
  ],
  entryComponents: [
    AddReservedInstanceComponent,
    InstanceCrudComponent,
    DialogOverviewDialog,

  ]
})
export class OrganizationModule {
  static forRoot() {
    return {
      ngModule: OrganizationModule,
      providers: [OrganizationService, StatsService, DashboardService]
    };
  }
}
