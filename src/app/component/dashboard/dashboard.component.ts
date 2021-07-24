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
  multi = [
    {
      name: 'thu hai',
      series: [
        {
          name: 'di lam',
          value: 22,
        },
        {
          name: 'ko di lam',
          value: 1,
        },
      ],
    },

    {
      name: 'thu ba',
      series: [
        {
          name: 'di lam',
          value: 21,
        },
        {
          name: 'ko di lam',
          value: 2,
        },
      ],
    },

    {
      name: 'thu tu ',
      series: [
        {
          name: 'di lam',
          value: 20,
        },
        {
          name: 'ko di lam',
          value: 3,
        },
      ],
    },
    {
      name: 'thu nam',
      series: [
        {
          name: 'di lam',
          value: 17,
        },
        {
          name: 'ko di lam',
          value: 6,
        },
      ],
    },
    {
      name: 'thu sau',
      series: [
        {
          name: 'di lam',
          value: 23,
        },
        {
          name: 'ko di lam',
          value: 0,
        },
      ],
    },
    {
      name: 'thu bay',
      series: [
        {
          name: 'di lam',
          value: 23,
        },
        {
          name: 'ko di lam',
          value: 0,
        },
      ],
    },
  ];
  // options
  view = [396, 350];
  viewAttendance = [800, 550];
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
