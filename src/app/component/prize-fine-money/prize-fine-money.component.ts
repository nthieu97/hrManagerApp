import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PrizeFineMoneyService} from "src/app/service/prize-fine-money.service"
@Component({
  selector: 'app-prize-fine-money',
  templateUrl: './prize-fine-money.component.html',
  styleUrls: ['./prize-fine-money.component.css']
})
export class PrizeFineMoneyComponent implements OnInit {
  list_prize_fine = []
  constructor(private prizeFineMoneyService: PrizeFineMoneyService,
  private router:Router
  ) { }

  ngOnInit(): void {
    this.getAllPrizeFine()
  }
  getAllPrizeFine() {
    this.prizeFineMoneyService.getAllPrize().subscribe((data) => {
      console.log(data);
      this.list_prize_fine = data.data
    })
  }
}