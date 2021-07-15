import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AttendanceService } from 'src/app/service/attendance.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
  constructor(private attendanceService: AttendanceService) {}
  // tslint:disable-next-line: member-ordering
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  hasDevices: boolean;
  hasPermission: boolean;
  activeScan = true;
  qrResultString: string;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string): void {
    this.qrResultString = resultString;
    console.log(resultString);

    this.attendanceService
      .handleAttendance(this.qrResultString)
      .subscribe((data) => {
        console.log(data);
      });
  }
  handleNotFoundCamera(event: Event): void {
    console.log(event);
  }
  onDeviceSelectChange(selected: string): void {
    const device = this.availableDevices.find((x) => x.deviceId === selected);
    this.currentDevice = device || null;
  }
  ngOnInit(): void {}
}
