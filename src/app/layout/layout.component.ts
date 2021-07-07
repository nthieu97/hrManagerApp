import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  dropdown = false;
  ngOnInit(): void {}
  toggleDropdown(): void {
    this.dropdown = !this.dropdown;
  }
  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
