import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';

@Component({
  selector: 'app-time-off-list',
  templateUrl: './time-off-list.component.html',
  styleUrls: ['./time-off-list.component.css'],
})
export class TimeOffListComponent implements OnInit {
  listTimeOff = [];
  page = 1;
  collectionSize: any;
  pageSize: any;
  loading = false;
  constructor(private timeOffService: TimeOffService) {}

  ngOnInit(): void {
    this.timeOffService.getAllTimeOff().subscribe((data) => {
      this.listTimeOff = data.data;
      this.page = data.meta.currentPage;
      this.collectionSize = data.meta.total;
      this.pageSize = data.meta.perPage;
    });
  }
  handlePaginate(event): void {
    this.loading = true;
    this.timeOffService.paginateTime(String(event)).subscribe((data) => {
      this.listTimeOff = data.data;
      this.loading = false;
    });
  }
  timeOffTooltip(tooltip, greeting: any) {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
}
