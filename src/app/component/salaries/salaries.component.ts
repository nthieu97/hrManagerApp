import { Component, OnInit } from '@angular/core';
import { SalaryService } from 'src/app/service/salary.service';
import { AuthService } from 'src/app/service/auth.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  isAdmin: boolean;
  loading = false;
  salaryData:any;
  page = 1;
  pageSize: any;
  collectionSize: any;
  id:any;
  payment= true;
  status=true;
  closeResult = '';
  
 
  constructor(
    private salaryService: SalaryService,
    private authService: AuthService,
    private modalService: NgbModal,
    private route:ActivatedRoute,
    
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.id = this.route.snapshot.params['id']
    // this. getSalaryDetail();
    this.getSalaries();
  }
  getSalaries(): void {
    this.salaryService.getAllSalary().subscribe((data) => {
      // console.log(data)
      this.salaryData = data.data;

      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
      console.log(this.page);
    });
  }
  
  handlePaginate(event): void {
    this.loading = true;
    this.salaryService.getAllSalary(String(event)).subscribe((data) => {
      this.salaryData = data.data;
      this.loading = false;
    });
  }
  // changePay(){
  //   this.salaryService.payment(this.id) = !this.payment;
  
  //   this.status = !this.status ;
  // }

  // open(content) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}

