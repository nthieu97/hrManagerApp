import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeesComponent } from './employees/employees.component';
import { LayoutComponent } from './/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { ScanComponent } from './scan/scan.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AtendanceAnalyticsComponent } from './atendance-analytics/atendance-analytics.component';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employee/:id', component: EmployeeDetailComponent },
      { path: 'employee', component: EmployeesComponent },
      { path: 'scan', component: ScanComponent },
      { path: 'attendance', component: AttendanceComponent },

      {
        path: 'attendanceAnalytics',
        component: AtendanceAnalyticsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
