import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LandingComponent} from './landing/landing.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {DashboardComponent} from './organization/dashboard/dashboard.component';
import {AuthGuardService} from './user/auth-guard.service';
import {LoginComponent} from './user/login/login.component';
import {SignUpComponent} from './user/sign-up/sign-up.component';
import {ProfileComponent} from './user/profile/profile.component';
import {CostAnalysisComponent} from './organization/cost-analysis/cost-analysis.component';
import {CalibrationComponent} from './organization/calibration/calibration.component';
import {RiskAnalysisComponent} from './organization/risk-analysis/risk-analysis.component';
import {RiskAnalysisListComponent} from './organization/risk-analysis/risk-analysis-list/risk-analysis-list.component';
import {RiskAnalysisDetailsComponent} from './organization/risk-analysis/risk-analysis-details/risk-analysis-details.component';
import {ReleaseComparisionsComponent} from './organization/release-comparisions/release-comparisions.component'
import { HaTestingComponent } from './organization/ha-testing/ha-testing.component';
import { TestResultsComponent } from './organization/test-results/test-results.component';
import { ProjectComponent} from './organization/project/project.component';
import { NewProjectComponent } from './organization/project/new-project/new-project.component';
import { ViewProjectComponent } from './organization/project/view-project/view-project.component';
import { TestComponent } from './organization/test/test.component';
import { SelectLabComponent } from './organization/test/select-lab/select-lab.component';
import { ClientMetricComponent } from './organization/test/client-metric/client-metric.component';
import { TestConfigurationComponent } from './organization/test/test-configuration/test-configuration.component';
import { LogsComponent } from './organization/test/logs/logs.component';
import { ResultsComponent } from './organization/test/results/results.component';
import { ClientStatusComponent } from './organization/test/client-status/client-status.component';
import { ServerMetricsComponent } from './organization/test/server-metrics/server-metrics.component';
import { UsageModelAnalysisComponent } from './organization/usage-model-analysis/usage-model-analysis.component';
import { EditorComponent } from './organization/test/editor/editor.component';
import { CreateOrganizationComponent } from './organization/create-organization/create-organization.component';


//Resove
import { GridsResolver } from './resolve/grids.resolve';
import { TestsResolver } from './resolve/tests.resolve';
import { TestResolver } from './resolve/test.resolve';
import { OrganizationResolver } from './resolve/organization.resolve';
import { ProjectsResolver } from './resolve/projects.resolve';
import { ServerMetricResolver } from './resolve/servermetric.resolve';
import { JmxResolver } from './resolve/jmx.resolve';

const appRoutes: Routes = [
  {path: '',  component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'register', component: SignUpComponent, canActivate: [AuthGuardService]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]} /* work in progress */,
  {path: 'cost-analysis', component: CostAnalysisComponent, canActivate: [AuthGuardService]},
  {path: 'calibration', component: CalibrationComponent, canActivate: [AuthGuardService]},
  {path: 'create-organization', component: CreateOrganizationComponent, canActivate: [AuthGuardService]},
  {
    path: 'risk-analysis',
    component: RiskAnalysisComponent,
    canActivate: [AuthGuardService],
    data: {
      authGuard: true
    },
    children: [
      {
        path: '',
        component: RiskAnalysisListComponent
      },
      {
        path: 'details',
        component: RiskAnalysisDetailsComponent
      },
    ]
  },
  {path: 'ha-testing', component: HaTestingComponent, canActivate: [AuthGuardService], resolve: {
    projects: ProjectsResolver
  }},
  {path: 'test-results', component: TestResultsComponent, canActivate: [AuthGuardService]},
  {path: 'project', component: ProjectComponent, resolve: {
    //organization: OrganizationResolver,
    projects: ProjectsResolver
  }, canActivate: [AuthGuardService]
  },
  {path: 'project/new', component: NewProjectComponent, canActivate: [AuthGuardService]},
  {path: 'project/:projectId', component: ViewProjectComponent, resolve: {
      grids: GridsResolver,
      tests: TestsResolver,
      //projects: ProjectsResolver
    }
    // children: [
    //   { path: 'test/:testId', component: TestComponent}
    // ]
  },
  {path: 'project/:projectId/:testId', component: TestComponent, resolve: {
      grids: GridsResolver,
      tests: TestsResolver,
      test: TestResolver,
      jmx: JmxResolver
    },
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'select-lab', pathMatch: 'full' },
      { path: 'select-lab', component: SelectLabComponent},
      { path: 'client-metric', component: ClientMetricComponent},
      { path: 'test-configuration', component: TestConfigurationComponent},
      { path: 'logs', component: LogsComponent},
      { path: 'results', component: ResultsComponent},
      { path: 'client-status', component: ClientStatusComponent},
      { path: 'server-metrics', component: ServerMetricsComponent, resolve: {
        //servermetric: ServerMetricResolver
      }},
      { path: 'editor', component: EditorComponent},
    ]
  },
  {path: 'usage-model-analysis', component: UsageModelAnalysisComponent, canActivate: [AuthGuardService]},
  {path: 'release-comparisions', component: ReleaseComparisionsComponent, canActivate: [AuthGuardService]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {useHash:true})],
  exports: [RouterModule],
  providers: [AuthGuardService, GridsResolver]
})
export class AppRoutingModule {}
