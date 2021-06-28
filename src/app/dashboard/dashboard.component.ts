import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  single: any[];

  // options
  gradient = false;
  showLegend = false;
  label = true;
  isDoughnut = true;
  legendPosition = 'below';
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
  constructor() {}

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
