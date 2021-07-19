import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { EmployeesComponent } from './component/employees/employees.component';
import { LayoutComponent } from './/layout/layout.component';
import { LoginComponent } from './component/login/login.component';
import { ScanComponent } from './component/scan/scan.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { AtendanceAnalyticsComponent } from './component/atendance-analytics/atendance-analytics.component';
import { AuthGuard } from './guard/auth.guard';
import { PositionAddFormComponent } from './component/position-add-form/position-add-form.component';
import { PositionsComponent } from './component/positions/positions.component';
import { SalariesComponent } from './component/salaries/salaries.component';
import { DepartmentComponent } from './component/department/department.component';
import { DepartmentFormComponent } from './component/department-form/department-form.component';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { TimeOffComponent } from './component/time-off/time-off.component';
import { TimeOffAddComponent } from './component/time-off-add/time-off-add.component';
import { UpdateOtComponent } from './component/update-ot/update-ot.component';
import { PrizeFineMoneyComponent } from './component/prize-fine-money/prize-fine-money.component';
import { PrizeFineFormComponent } from './component/prize-fine-form/prize-fine-form.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
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
        component: PositionsComponent,
      },
      {
        path: 'position-add',
        component: PositionAddFormComponent,
      },
      {
        path: 'position-edit/:id',
        component: PositionAddFormComponent,
      },
      {
        path: 'salaries',
        component: SalariesComponent,
      },
      {
        path: 'departments',
        component:DepartmentComponent
      },
      {
        path: 'department-form',
        component:DepartmentFormComponent
      },
      {
        path: 'department-edit/:id',
        component:DepartmentFormComponent
      },
      {
        path: 'employee-form',
        component:EmployeeFormComponent
      },
      {
        path: 'time-off',
        component:TimeOffComponent
      },
      {
        path: 'time-off-add',
        component:TimeOffAddComponent
      },
      {
        path: 'update-ot',
        component:UpdateOtComponent
      },
      {
        path: 'prize-fine-money',
        component:PrizeFineMoneyComponent
      },
      {
        path: 'prize-fine-add',
        component:PrizeFineFormComponent
      }
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
