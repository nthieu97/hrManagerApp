import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  dropdown = false;
  check = false;
  dropdownSalaries = false;
  dropOT = false;
  dropTime = false;
  dropdownadd = false;
  toggleDropuser = false;
  isAdmin = false;
  isLeader = false;
  user: User;
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.user = this.authService.getCurrentUser();
    this.isLeader = this.authService.isLeader() || this.isAdmin;
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
}
