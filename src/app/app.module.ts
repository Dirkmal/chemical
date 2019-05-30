import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxElectronModule } from 'ngx-electron';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NewpatientComponent } from './newpatient/newpatient.component';
import { AllpatientsComponent } from './allpatients/allpatients.component';
import { PatientsReportsComponent } from './patients-reports/patients-reports.component';
import { EditpatientComponent } from './editpatient/editpatient.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { HomeComponent } from './home/home.component';
import { AllreportsComponent } from './allreports/allreports.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { PreviewComponent } from './preview/preview.component';
import { AlertComponent } from './alert/alert.component';

import { ServerInfoLoader } from './server-info-loader';
import { ModalComponent } from './modal/modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelsComponent } from './panels/panels.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { ScrollToDirective } from './scroll-to.directive';
import { AddTestComponent } from './add-test/add-test.component';
import { ReportsComponent } from './reports/reports.component';
import { TruncatePipe } from './truncate.pipe';

export function initializeApp(api_s: ServerInfoLoader) {
  return () => api_s.load();
}

@NgModule({
  declarations: [
    AppComponent,
    CreateTestComponent,
    NavbarComponent,
    NewpatientComponent,
    AllpatientsComponent,
    PatientsReportsComponent,
    EditpatientComponent,
    CreateReportComponent,
    HomeComponent,
    AllreportsComponent,
    EditReportComponent,
    PreviewComponent,
    AlertComponent,
    ModalComponent,
    DashboardComponent,
    PanelsComponent,
    EditTestComponent,
    ScrollToDirective,
    AddTestComponent,
    ReportsComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxElectronModule,
    NgbModule
  ],
  providers: [
    ServerInfoLoader,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ServerInfoLoader],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
