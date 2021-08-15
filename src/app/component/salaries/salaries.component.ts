import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
import { AuthService } from 'src/app/service/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ToastsService } from 'src/app/service/toasts.service';
@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  isAdmin: boolean;
  loading = false;
  salaryData: any;

  page = 1;
  pageSize: any;
  collectionSize: any;
  id: string;
  payment = true;
  status = true;
  closeResult = '';

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
    private toatService: ToastsService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.id = this.route.snapshot.params.id;
    // this. getSalaryDetail();
    this.getSalaries();
    // this.changePay();
  }
  getSalaries(): void {
    this.salaryService.getAllSalary().subscribe((data) => {
      this.salaryData = data.data;
      console.log(data.data);

      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }

  handlePaginate(event): void {
    this.loading = true;
    this.salaryService.getAllSalary(String(event)).subscribe((data) => {
      this.salaryData = data.data;
      this.loading = false;
    });
  }

  changePay(id): void {
    this.salaryService.paymentSalary(id).subscribe(
      (data) => {
        this.id = data.id;
        this.toatService.show(data.message, {
          className: 'bg-success text-success',
          delay: 3000,
        }),
          this.getSalaries();
      },
      (err: any) => {
        this.toatService.show(err.message, {
          className: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
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
