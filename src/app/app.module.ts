import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './component/login/login.component';
import { EmployeeDetailComponent } from './component/employee-detail/employee-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScanComponent } from './component/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsModule } from './bs module/bs.module';
import { NgxKjuaModule } from 'ngx-kjua';
import { EmployeesComponent } from './component/employees/employees.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { AtendanceAnalyticsComponent } from './component/atendance-analytics/atendance-analytics.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { PositionAddFormComponent } from './component/position-add-form/position-add-form.component';
import { PositionsComponent } from './component/positions/positions.component';
import { SalariesComponent } from './component/salaries/salaries.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { ToastComponent } from './component/toast/toast.component';
import { DepartmentComponent } from './component/department/department.component';
import { DepartmentFormComponent } from './component/department-form/department-form.component';
import { EmployeeFormComponent } from './component/employee-form/employee-form.component';
import { TimeOffComponent } from './component/time-off/time-off.component';
import { TimeOffAddComponent } from './component/time-off-add/time-off-add.component';
import { UpdateOtComponent } from './component/update-ot/update-ot.component';
import { PrizeFineMoneyComponent } from './component/prize-fine-money/prize-fine-money.component';
import { PrizeFineFormComponent } from './component/prize-fine-form/prize-fine-form.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { TimeOffListComponent } from './component/time-off-list/time-off-list.component';
import { ListOtComponent } from './component/list-ot/list-ot.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { SalaryByUserComponent } from './component/salary-by-user/salary-by-user.component';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrashOtComponent } from './component/trash-ot/trash-ot.component';
import { ListOtByTimeComponent } from './component/list-ot-by-time/list-ot-by-time.component';
import { TrashTimeOffComponent } from './component/trash-time-off/trash-time-off.component';
import { TrashPrizeFineComponent } from './component/trash-prize-fine/trash-prize-fine.component';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeVi, 'vi-VN');
FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    DashboardComponent,
    LoginComponent,
    EmployeeDetailComponent,
    ScanComponent,
    EmployeesComponent,
    AttendanceComponent,
    AtendanceAnalyticsComponent,
    PositionsComponent,
    PositionAddFormComponent,
    SalariesComponent,
    ToastComponent,
    DepartmentComponent,
    DepartmentFormComponent,
    EmployeeFormComponent,
    TimeOffComponent,
    TimeOffAddComponent,
    UpdateOtComponent,
    PrizeFineMoneyComponent,
    PrizeFineFormComponent,
    ChangePasswordComponent,
    TimeOffListComponent,
    ListOtComponent,
    ForgotPasswordComponent,
    SalaryByUserComponent,
    TrashOtComponent,
    ListOtByTimeComponent,
    TrashTimeOffComponent,
    TrashPrizeFineComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ZXingScannerModule,
    FormsModule,
    NgxKjuaModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    BsModule,
    HttpClientModule,
    FullCalendarModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
