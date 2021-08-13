import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as html2canvas from 'html2canvas';
import { EmployeeService } from 'src/app/service/employee.service';
// declare let html2canvas: any;
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  constructor(
    private employeeService: EmployeeService,
    private atr: ActivatedRoute
  ) {}
  userInfo;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downLoadLink') downloadLink: ElementRef;
  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      const id = params.id;
      this.employeeService.getUserById(id).subscribe((res) => {
        this.userInfo = res.data;
      });
    });
  }
  downloadCard(): void {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'employee-qrcode.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
