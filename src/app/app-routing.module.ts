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
import { PositionsComponent } from './positions/positions.component';
import { PositionAddFormComponent } from './position-add-form/position-add-form.component';
import { PositionEditFormComponent } from './position-edit-form/position-edit-form.component';
import { SalariesComponent } from './salaries/salaries.component';
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
      {
        path: 'positions',
        component: PositionsComponent
      },
      {
        path: 'position-add-form',
        component:PositionAddFormComponent
      },
      {
        path: 'position-edit-form',
        component:PositionEditFormComponent
      },
      {
        path: 'salaries',
        component:SalariesComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
