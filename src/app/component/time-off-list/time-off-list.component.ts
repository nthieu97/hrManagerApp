import { Component, OnInit } from '@angular/core';
import { TimeOffService } from 'src/app/service/time-off.service';

@Component({
  selector: 'app-time-off-list',
  templateUrl: './time-off-list.component.html',
  styleUrls: ['./time-off-list.component.css'],
})
export class TimeOffListComponent implements OnInit {
  listTimeOff;

  loading = false;
  constructor(private timeOffService: TimeOffService) {}

  ngOnInit(): void {
    this.timeOffService.getAllTimeOff().subscribe((data) => {
      this.listTimeOff = data;
    });
  }

  timeOffTooltip(tooltip, greeting: any): void {
    if (tooltip.isOpen()) {
      tooltip.close();
    } else {
      tooltip.open({ greeting });
    }
  }
}
