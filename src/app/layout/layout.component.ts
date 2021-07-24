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
  dropOT = false;
  dropTime = false
  isAdmin;
  user: User;
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.user = this.authService.getCurrentUser();
  }
  toggleDropdown(): void {
    this.dropdown = !this.dropdown;
  }
  toggleDropdownOT(): void {
    this.dropOT = !this.dropOT
  }
  toggleDropdownTime(): void {
    this.dropTime = !this.dropTime
  }
  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
