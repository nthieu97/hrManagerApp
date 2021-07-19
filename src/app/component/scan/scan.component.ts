import { Component, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { debounceTime, delay } from 'rxjs/operators';
import { ScanData, ScanResponse } from 'src/app/model/scan.model';

import { AttendanceService } from 'src/app/service/attendance.service';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  constructor(
    private attendanceService: AttendanceService,
    private toastService: ToastsService
  ) {}
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;
  activeScan = true;
  qrResultString: string;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  scanResponseData: ScanData[] = [];
  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string): void {
    this.qrResultString = resultString;

    this.attendanceService
      .handleAttendance(this.qrResultString)
      .pipe(debounceTime(1000))
      .subscribe(
        (data: ScanResponse) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000,
          });
          this.scanResponseData.push(data.data);
        },
        (err: any) => {
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
        }
      );
  }
  handleNotFoundCamera(event: Event): void {
    this.toastService.show(
      'Không tìm thấy thiết bị , Vui lòng bật Camera và bấm f5 tải lại trang',
      { classname: 'bg-danger text-light', delay: 3000 }
    );
  }
  onDeviceSelectChange(selected: string): void {
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.currentDevice = device || null;
  }
  ngOnInit(): void {}
}
