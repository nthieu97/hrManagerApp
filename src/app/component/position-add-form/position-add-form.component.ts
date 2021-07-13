import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { responePosition } from 'src/app/model/position.model';
import { PossitionService } from 'src/app/service/possition.service';

@Component({
  selector: 'app-position-add-form',
  templateUrl: './position-add-form.component.html',
  styleUrls: ['./position-add-form.component.css'],
})
export class PositionAddFormComponent implements OnInit {
  constructor(
    private atr: ActivatedRoute,
    private positionService: PossitionService,
    private router: Router
  ) {}
  namePosition: string;
  idPosition: string;
  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      this.idPosition = params.id;
      if (this.idPosition) {
        this.positionService
          .getPosition(this.idPosition)
          .subscribe((data: responePosition) => {
            this.namePosition = data.data.name;
          });
      }
    });
  }
  handleSubmit(value): void {
    const name = value.name;
    if (this.idPosition) {
      this.positionService
        .updatePosition(this.idPosition, name)
        .subscribe(() => {
          this.router.navigate(['/', 'positions']);
        });
      return;
    }
    this.positionService.createPosition(name).subscribe(() => {
      this.router.navigate(['/', 'positions']);
    });
  }
}
