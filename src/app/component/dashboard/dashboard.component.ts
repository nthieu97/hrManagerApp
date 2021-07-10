import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  single: any[];

  // options
  view = [, 350];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  data = [
    {
      name: 'developer',
      value: 10,
    },
    { name: 'designner', value: 2 },
    { name: 'BA', value: 1 },
  ];
  isAdmin: boolean;
  username: string;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.username = this.authService.getCurrentUser().user_account;
  }
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
