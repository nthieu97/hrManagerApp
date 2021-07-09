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
import { FormsModule } from '@angular/forms';
import { ScanComponent } from './component/scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsModule } from './bs module/bs.module';
import { NgxKjuaModule } from 'ngx-kjua';
import { EmployeesComponent } from './component/employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { AtendanceAnalyticsComponent } from './component/atendance-analytics/atendance-analytics.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
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
      PositionEditFormComponent,
      SalariesComponent,

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
