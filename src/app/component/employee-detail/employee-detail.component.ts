import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as html2canvas from 'html2canvas';
// declare let html2canvas: any;
@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  constructor() {}
  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downLoadLink') downloadLink: ElementRef;
  ngOnInit(): void {}
  downloadCard(): void {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'employee-qrcode.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
