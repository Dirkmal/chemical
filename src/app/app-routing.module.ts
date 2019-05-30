import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewpatientComponent } from './newpatient/newpatient.component';
import { AllpatientsComponent } from './allpatients/allpatients.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { AllreportsComponent } from './allreports/allreports.component';
import { PreviewComponent } from './preview/preview.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'newp', component: NewpatientComponent },
  { path: 'allp', component: AllpatientsComponent },
  { path: 'create_report/p_id/:p_id', component: CreateReportComponent},
  { path: 'allr', component: AllreportsComponent},
  { path: 'preview/id/:id', component: PreviewComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }
