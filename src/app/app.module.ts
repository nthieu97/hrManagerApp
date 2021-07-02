import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { FormsModule } from '@angular/forms';
import { ScanComponent } from './scan/scan.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BsModule } from './bs/bs.module';
import { NgxKjuaModule } from 'ngx-kjua';
import { EmployeesComponent } from './employees/employees.component';
import { HttpClientModule } from '@angular/common/http';
import { AttendanceComponent } from './attendance/attendance.component';
import { AtendanceAnalyticsComponent } from './atendance-analytics/atendance-analytics.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

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
