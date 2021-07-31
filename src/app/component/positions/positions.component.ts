import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PositionService } from 'src/app/service/position.service';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
})
export class PositionsComponent implements OnInit {
  constructor(
    private positionService: PositionService,
    private router: Router,
    private toastService: ToastsService
  ) {}
  positions;

  ngOnInit(): void {
    this.getAllPosition();
  }
  getAllPosition() {
    this.positionService.getAllPosition().subscribe((data) => {
      this.positions = data.data;
    });
  }
  handleDelete(id: string, index): void {
    const conf = confirm('you definitely want to delete');
    if (conf) {
      this.positionService.deletePosition(id).subscribe((data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 3000,
        }),
          // tslint:disable-next-line: no-unused-expression
          (err) => {
            this.toastService.show(err.message, {
              classname: 'bg-danger text-light',
              delay: 3000,
            });
          };
        // this.positions.splice(index, 1);
      });
    }
    this.getAllPosition();
  }
}
