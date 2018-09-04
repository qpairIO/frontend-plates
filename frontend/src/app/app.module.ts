import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule
} from '@angular/material';
import 'hammerjs';
import {SpinnerModule} from '@tsmean/spinner';
import {NotifyModule} from '@tsmean/toast';
import {AppRoutingModule} from './app-routing.module';
import {TopnavComponent} from './topnav/topnav.component';
import {MenuComponent} from './menu/menu.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LandingComponent} from './landing/landing.component';
import {JumbotronComponent} from './jumbotron/jumbotron.component';
import {SpacerComponent} from './spacer/spacer.component';
import {AppComponent} from './app.component';
import {UserModule} from './user/user.module';
import {AnimalModule} from './animal/animal.module';
import {environment} from '../environments/environment';
import {ResourceModule} from './resource/resource.module';
import {AuthHeaderInterceptor} from './user/auth.http.interceptor';
import {AnimalListModule} from './animal-list/animal-list.module';
import {OrganizationModule} from './organization/organization.module';
import { ToastrModule } from 'ngx-toastr';

//Resove
import { GridsResolver } from './resolve/grids.resolve';
import { TestsResolver } from './resolve/tests.resolve';
import { GridResolver } from './resolve/grid.resolve';
import { TestResolver } from './resolve/test.resolve';
import { OrganizationResolver } from './resolve/organization.resolve';
import { ProjectsResolver } from './resolve/projects.resolve';
import { ServerMetricResolver } from './resolve/servermetric.resolve';
import { JmxResolver } from './resolve/jmx.resolve';

//Service
import { GlobalSettings } from './service/data.shared';

@NgModule({
  declarations: [
    AppComponent,
    TopnavComponent,
    MenuComponent,
    PageNotFoundComponent,
    LandingComponent,
    JumbotronComponent,
    SpacerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    NotifyModule.forRoot(),
    ResourceModule.forRoot(environment.api),
    AnimalModule.forRoot(),
    AnimalListModule.forRoot(),
    UserModule.forRoot(environment.apiLogin),
    SpinnerModule.forRoot({
      animation: 'spin 1s ease-in-out infinite',
      primaryColor: '#3F51B5',
      secondaryColor: '#FF4081'
    }),
    ToastrModule.forRoot(),
    OrganizationModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true
    },
    GridsResolver,
    GridResolver,
    TestsResolver,
    TestResolver,
    OrganizationResolver,
    ProjectsResolver,
    ServerMetricResolver,
    JmxResolver,
    GlobalSettings
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
