import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
@Component({
  selector: 'app-prize-fine-money',
  templateUrl: './prize-fine-money.component.html',
  styleUrls: ['./prize-fine-money.component.css'],
})
export class PrizeFineMoneyComponent implements OnInit {
  constructor(
    private prizeFineMoneyService: PrizeFineMoneyService,
    private router: Router
  ) {}
  list_prize_fine = [];
  keyword = '';
  loading = false;
  page = 1;
  pageSize:any;
  collectionSize:any;
  ngOnInit(): void {
    this.search();
  }
  search() {
    this.prizeFineMoneyService.getAllPrize(this.keyword).subscribe((data) => {
      this.list_prize_fine = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
      console.log(this.keyword);
    });
  }
  handleDelete(id: string, index): void {
    this.prizeFineMoneyService.deletePrizeFine(id).subscribe(() => {
      // console.log(id);
      this.list_prize_fine.splice(index, 1);
    });
  }
  
  handlePaginate(event) {
    this.loading = true;
    this.prizeFineMoneyService
      .paginatePrize(String(event))
      .subscribe((data) => {
        this.list_prize_fine = data.data;
        this.loading = false;
      });
  }
}
