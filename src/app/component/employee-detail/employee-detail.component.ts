import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
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
  // @ViewChild('canvasImg') canvasImg: ElementRef;
  // @Input() public width = 200;
  // @Input() public height = 200;
  // private cx: CanvasRenderingContext2D;
  ngOnInit(): void {
    this.atr.params.subscribe((param) => {
      if (param.id) {
        const id = param.id;
        this.employeeService.getUserById(id).subscribe((res) => {
          this.userInfo = res.data;
        });
      } else {
        this.employeeService.getDetail().subscribe((data) => {
          this.userInfo = data.data;
        });
      }
    });
  }
  // drawImage(srcImg: string) {
  //   const canvasEl: HTMLCanvasElement = this.canvasImg.nativeElement;
  //   this.cx = canvasEl.getContext('2d');
  //   const image = new Image();
  //   image.setAttribute('src', srcImg);
  //   canvasEl.width = this.width;
  //   canvasEl.height = this.height;
  //   this.cx.lineWidth = 3;
  //   this.cx.lineCap = 'round';
  //   this.cx.strokeStyle = '#000';
  //   image.onload = () => {
  //     this.cx.drawImage(image, 0, 0, this.width, this.height);
  //   };
  //   image.src = srcImg;
  // }
  downloadCard(): void {
    html2canvas(this.screen.nativeElement).then((canvas) => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = 'employee-qrcode.png';
      this.downloadLink.nativeElement.click();
    });
  }
}
