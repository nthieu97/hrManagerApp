import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DashboardService } from '../service/dashboard.service';
import { EmployeeService } from '../service/employee.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private employeeService: EmployeeService,
    private homeService: DashboardService,
    private modalService: NgbModal
  ) {}
  dropdown = false;
  check = false;
  dropdownSalaries = false;
  dropOT = false;
  dropTime = false;
  dropdownadd = false;
  toggleDropuser = false;
  isAdmin = false;
  isLeader = false;
  user;
  listNotify = [];
  countNotify = [];
  closeResult = '';
  getDetailNotify = '';
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.user = this.authService.getCurrentUser();
    this.employeeService.getUserById(String(this.user.id)).subscribe((data) => {
      this.user = data.data;
      console.log(data.data);
    });
    this.isLeader = this.authService.isLeader() || this.isAdmin;
    this.getAllNotify();
    this.totalNotify();
  }
  toggleDropdown(): void {
    this.dropdown = !this.dropdown;
  }
  toggleDropdownOT(): void {
    this.dropOT = !this.dropOT;
  }
  toggleDropdownTime(): void {
    this.dropTime = !this.dropTime;
  }
  toggleDropdownSalaries(): void {
    this.dropdownSalaries = !this.dropdownSalaries;
  }
  toggleDropdownadd(): void {
    this.dropdownadd = !this.dropdownadd;
  }
  toggleDropdownuser(): void {
    this.toggleDropuser = !this.toggleDropuser;
  }

  addclass(): void {
    if (this.check === false) {
      this.check = true;
    } else {
      this.check = false;
    }
  }

  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
  getAllNotify(): void {
    this.homeService.listNotify().subscribe((data) => {
      this.listNotify = data.data;
      console.log(this.listNotify);
    });
  }
  getListNotify(contentList) {
    this.homeService.listNotify().subscribe((data) => {
      let x = data.data;
      console.log('view all', x);
      for (let i = 0; i < x.length; i++) {
        this.listNotify.push(x[i]);
      }
    });
    this.modalService
      .open(contentList, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Close with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  totalNotify(): void {
    this.homeService.countNotify().subscribe((data) => {
      this.countNotify = data.data;
    });
  }

  notifyDetail(contentDetail, id: string) {
    this.homeService.detailNotify(id).subscribe((data) => {
      console.log(data.data);
      this.getDetailNotify = data.data;
      this.totalNotify();
      this.getAllNotify();
    });
    this.modalService
      .open(contentDetail, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Close with: ${result}`;
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
