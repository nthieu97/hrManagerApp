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

  ngOnInit(): void {
    this.positionService.getAllPosition().subscribe((data) => {
      this.positions = data.data;
    });
  }
}
