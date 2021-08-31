import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ToastsService } from 'src/app/service/toasts.service';
import { HttpParams } from '@angular/common/http';
import { ExportExcelService } from 'src/app/service/export-excel.service';
export interface SalariesMap {
  userID: string;
  name: string;
  gross: number;
  net: number;
  leave: number;
  date: string;
  status: number;
  id: number;
}
@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  isAdmin: boolean;
  loading = false;
  salaries: SalariesMap[];
  fileName = '';
  first = 0;
  rows = 10;
  id: string;
  payment = true;
  status = true;
  closeResult = '';
  filterParam: HttpParams = new HttpParams();
  salaryDetail: any = [];
  totalWork: any = [];
  totalLeave: any = [];
  moneyFine: any = [];
  moneyPrize: any = [];

  constructor(
    private salaryService: SalaryService,
    private authService: AuthService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toatService: ToastsService,
    private excel: ExportExcelService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.id = this.route.snapshot.params.id;
  }
  getSalaries(): void {
    this.salaryService.getAllSalary(this.filterParam).subscribe((data) => {
      this.salaries = data;
      this.loading = false;
    });
  }
  onFileSelect(event): void {
    const file: File = event.target.files[0];

    if (file) {
      this.loading = true;
      this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file, file.name);
      this.salaryService.importTable(formData).subscribe(
        (data) => {
          this.fileName = '';
          this.toatService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000,
          });
          this.getSalaries();
        },
        (error) => {
          this.fileName = '';
          this.loading = false;
          this.toatService.show(error.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
        }
      );
    }
  }
  salariesTooltip(tooltip, greeting: string): void {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
  changePay(id): void {
    this.salaryService.paymentSalary(id).subscribe(
      (data) => {
        this.id = data.id;
        this.toatService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        const salaryCHange = this.salaries.find((salary) => salary.id === id);
      },
      (err: any) => {
        this.toatService.show(err.message, {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
  }
  exportExcel(): void {
    this.excel.exportExcel(this.salaries, 'luong thang ');
  }
  handleFilter(event): void {
    this.filterParam = this.filterParam.set('date', String(event.month));
    this.filterParam = this.filterParam.set('year', String(event.year));
    this.salaryService.getAllSalary(this.filterParam).subscribe((data) => {
      this.salaries = data;
    });
  }
  openDetail(contentDetail, id): void {
    this.salaryService.getSalaryDetail(id).subscribe((data) => {
      this.salaryDetail = data.data.luong;
      this.totalWork = data.data.tong_ngay_lam;
      this.totalLeave = data.data.tong_ngay_xin_nghi;
      this.moneyFine = data.data.get_fine_money;
      this.moneyPrize = data.data.get_pize_money;
    });
    this.modalService
      .open(contentDetail, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
