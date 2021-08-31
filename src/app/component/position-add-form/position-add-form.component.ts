import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponePosition } from 'src/app/model/position.model';
import { PositionService } from 'src/app/service/position.service';
import { ToastsService } from 'src/app/service/toasts.service';

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
    private router: Router,
    private toastService: ToastsService
  ) {}

  idPosition: string;
  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      this.idPosition = params.id;
      if (this.idPosition) {
        this.positionService
          .getPosition(this.idPosition)
          .subscribe((data: ResponePosition) => {
            this.model.namePosition = data.data.name;
          });
      }
    });
  }
  handleSubmit(value): void {
    const name = value.name;
    if (this.idPosition && name !== '') {
      this.positionService
        .updatePosition(this.idPosition, name)
        .subscribe((data) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000,
          }),
            (err: any) => {
              this.toastService.show(err.message, {
                classname: 'bg-danger text-light',
                delay: 3000,
              });
            };
          this.router.navigate(['/', 'positions']);
        });
      return;
    }
    this.positionService.createPosition(name).subscribe(
      (data) => {
        this.toastService.show('Thêm Chức Vụ Thành Công', {
          classname: 'bg-success text-light',
          delay: 3000,
        });
        this.router.navigate(['/', 'positions']);
      },
      (err: any) => {
        this.toastService.show('Không Thể Thêm Chức Vụ', {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
    if (name === '') {
    }
  }
}
