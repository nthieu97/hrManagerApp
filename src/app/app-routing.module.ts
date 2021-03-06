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
import { AdminGuard } from './guard/admin.guard';
import { ScanGuard } from './guard/scan.guard';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { TimeOffListComponent } from './component/time-off-list/time-off-list.component';
import { ListOtComponent } from './component/list-ot/list-ot.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { SalaryByUserComponent } from './component/salary-by-user/salary-by-user.component';
import { TrashOtComponent } from './component/trash-ot/trash-ot.component';
import { ListOtByTimeComponent } from './component/list-ot-by-time/list-ot-by-time.component';
import { TrashTimeOffComponent } from './component/trash-time-off/trash-time-off.component';
import { TrashPrizeFineComponent } from './component/trash-prize-fine/trash-prize-fine.component';
import { LoginGuard } from './guard/login.guard';
import { AttendanceFormComponent } from './component/attendance-form/attendance-form.component';
import { ErrorpageComponent } from './component/errorpage/errorpage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'mySalaries',
        component: SalaryByUserComponent,
      },
      { path: 'scan', component: ScanComponent, canActivate: [ScanGuard] },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'employee/detail/:id',
        component: EmployeeDetailComponent,
        canActivate: [AdminGuard],
      },
      { path: 'employee', component: EmployeesComponent },
      { path: 'employee/detail', component: EmployeeDetailComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'attendance-form', component: AttendanceFormComponent },
      { path: 'attendance-edit/:id', component: AttendanceFormComponent },
      {
        path: 'attendanceAnalytics',
        component: AtendanceAnalyticsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'positions',
        component: PositionsComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'position-add',
        component: PositionAddFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'position-edit/:id',
        component: PositionAddFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'salaries',
        component: SalariesComponent,
      },
      {
        path: 'departments',
        component: DepartmentComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'department-form',
        component: DepartmentFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'department-edit/:id',
        component: DepartmentFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'employee-form',
        component: EmployeeFormComponent,
      },
      {
        path: 'employee-edit/:id',
        component: EmployeeFormComponent,
      },
      {
        path: 'my-time-off',
        component: TimeOffComponent,
      },
      {
        path: 'time-off',
        component: TimeOffComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'time-off-add',
        component: TimeOffAddComponent,
      },
      {
        path: 'time-off-edit/:id',
        component: TimeOffAddComponent,
      },
      {
        path: 'time-off-list',
        component: TimeOffListComponent,
      },
      {
        path: 'update-ot',
        component: UpdateOtComponent,
        // canActivate: [AdminGuard],
      },
      {
        path: 'list-ot',
        component: ListOtComponent,
      },
      {
        path: 'list-ot-by-time',
        component: ListOtByTimeComponent,
      },
      {
        path: 'prize-fine-money',
        component: PrizeFineMoneyComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'prize-fine-add',
        component: PrizeFineFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'prize-fine-edit/:id',
        component: PrizeFineFormComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'trash-ot',
        component: TrashOtComponent,
      },
      {
        path: 'trash-time-off',
        component: TrashTimeOffComponent,
      },
      {
        path: 'trash-prize-fine',
        component: TrashPrizeFineComponent,
      },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: '**', component: ErrorpageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
