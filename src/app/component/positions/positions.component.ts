import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PositionService } from 'src/app/service/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit {
  constructor(
    private positionService: PositionService,
    private router: Router
  ) {}
  positions;
  loading = false;
  attendanceData;
  page = 1;
  pageSize;
  collectionSize = 5;

  ngOnInit(): void {
    this.positionService.getAllPosition().subscribe((data) => {
      console.log(data);
      this.positions = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
    this.search();
  }
  keyword: string = '';
  search() {
    this.positionService.getAllPosi(this.keyword).subscribe((data) => {
      this.positions = data.data;
      console.log(this.keyword);
    });
  }
  handlePaginate(event) {
    this.loading = true;
    this.positionService.paginateAttendance(String(event)).subscribe((data) => {
      this.attendanceData = data.data;
      this.loading = false;
    });
  }
  handleDelete(id: string, index): void {
    this.positionService.deletePosition(id).subscribe(() => {
      this.positions.splice(index, 1);
    });
  }
}
