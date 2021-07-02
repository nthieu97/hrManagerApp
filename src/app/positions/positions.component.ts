import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {

  constructor() { }
  data: any[] = [
    {
      id: 1,
      name: 'Leader',
    },
    {
      id: 2,
      name: 'Employee',
    },
    {
      id: 3,
      name: 'Leader',
    },
  ];
  positions: any = [];


  ngOnInit(): void {
    this.positions = this.data
  }

  //   addPosition() {
  // const  result = {
  //     name:this.positions.name
  // }
  //   this.positions.push(result)
  //   }

}
