import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { responePosition } from 'src/app/model/position.model';
import { PositionService } from 'src/app/service/position.service';

export class Position {
  public namePosition: string;
}
@Component({
  selector: 'app-position-add-form',
  templateUrl: './position-add-form.component.html',
  styleUrls: ['./position-add-form.component.css'],
})
export class PositionAddFormComponent implements OnInit {
  model = new Position();
  constructor(
    private atr: ActivatedRoute,
    private positionService: PositionService,
    private router: Router
  ) {}

  idPosition: string;
  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      this.idPosition = params.id;
      if (this.idPosition) {
        this.positionService
          .getPosition(this.idPosition)
          .subscribe((data: responePosition) => {
            this.model.namePosition = data.data.name;
            console.log(this.model.namePosition);
          });
      }
    });
  }
  handleSubmit(value): void {
    const name = value.name;
    if (this.idPosition && name !== '') {
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
    if (name == '') {
      console.log('error');
    }
  }
}
