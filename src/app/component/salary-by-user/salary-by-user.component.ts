import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-salary-by-user',
  templateUrl: './salary-by-user.component.html',
  styleUrls: ['./salary-by-user.component.css'],
})
export class SalaryByUserComponent implements OnInit {
  constructor(
    private salaryService: SalaryService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}
  loading = false;
  salaUserData;
  page = 1;
  pageSize: any;
  collectionSize: any;

  closeResult = '';
  salaryDetail: any = [];
  totalWork: any = [];
  totalLeave: any = [];
  moneyFine: any = [];
  moneyPrize: any = [];

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id']
    this.getSalaryUser();
  }

  getSalaryUser(): void {
    this.salaryService.getSalaryByUser().subscribe((data) => {
      this.salaUserData = data.data;

      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  salariesTooltip(tooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
  handlePaginate(event): void {
    this.loading = true;
    this.salaryService.getSalaryByUser(String(event)).subscribe((data) => {
      this.salaUserData = data.data;
      this.loading = false;
    });
    // console.log(this.salaUser);
  }

  openDetail(contentDetail, id): void {
    this.salaryService.getSalaryDetail(id).subscribe((data) => {
      console.log(id);
      // console.log(data);
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
