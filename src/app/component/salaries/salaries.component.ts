import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.css'],
})
export class SalariesComponent implements OnInit {
  constructor() {}
  data: any[] = [
    {
      id: 1,
      name: 'Tống Văn Tuấn',
      image:
        'https://image.thanhnien.vn/1024/uploaded/duyphuc/2021_06_04/hinh1_2_aowh.jpeg',
      position: 'Employee',
      salary: 5000000,
    },
    {
      id: 2,
      name: 'Tống Văn Tuấn',
      image:
        'https://image.thanhnien.vn/1024/uploaded/duyphuc/2021_06_04/hinh1_2_aowh.jpeg',
      position: 'Employee',
      salary: 5000000,
    },
    {
      id: 3,
      name: 'Tống Văn Tuấn',
      image:
        'https://image.thanhnien.vn/1024/uploaded/duyphuc/2021_06_04/hinh1_2_aowh.jpeg',
      position: 'Employee',
      salary: 5000000,
    },
  ];
  salaries: any = [];
  ngOnInit(): void {
    this.salaries = this.data;
  }
}
