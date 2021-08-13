import { Component, OnInit } from '@angular/core';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
import { EmployeeService } from 'src/app/service/employee.service';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { responsePrizeFine } from 'src/app/model/prize.model';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-prize-fine-form',
  templateUrl: './prize-fine-form.component.html',
  styleUrls: ['./prize-fine-form.component.css'],
})
export class PrizeFineFormComponent implements OnInit {
  employees = [];
  prizeFineForm: FormGroup;

  prizeFineId: string;

  constructor(
    private prizrFineService: PrizeFineMoneyService,
    private employeeService: EmployeeService,
    private router: Router,
    private atr: ActivatedRoute,
    private toastService: ToastsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.createForm();
    this.atr.params.subscribe((params) => {
      this.prizeFineId = params.id;
      if (this.prizeFineId) {
        this.prizrFineService
          .getDetailPrizeFine(this.prizeFineId)
          .subscribe((data) => {
            if (data.data.prize_money) {
              this.prizeFineForm.patchValue({
                type: true,
                note: data.data.name,
                user_id: data.data.user_id,
                money: data.data.prize_money,
              });
            } else {
              this.prizeFineForm.patchValue({
                type: false,
                note: data.data.name,
                user_id: data.data.user_id,
                money: data.data.fine_money,
              });
            }
          });
      }
    });
  }
  createForm(): void {
    this.prizeFineForm = this.fb.group({
      type: [true],
      user_id: ['', Validators.required],
      note: ['', Validators.required],
      money: [0, Validators.required],
    });
  }
  getEmployees(): void {
    this.employeeService.getAllUser().subscribe((data) => {
      this.employees = data.data;
    });
  }
  get f(): {
    [key: string]: AbstractControl;
  } {
    return this.prizeFineForm.controls;
  }
  checkPrizeFine(): object {
    const type = this.prizeFineForm.value.type;
    let body = {};
    if (type) {
      body = {
        user_id: this.prizeFineForm.value.user_id,
        name: this.prizeFineForm.value.note,
        thuong: 'thuong',
        prize_fine_money: this.prizeFineForm.value.money,
      };
    } else {
      body = {
        user_id: this.prizeFineForm.value.user_id,
        name: this.prizeFineForm.value.note,
        phat: 'phat',
        prize_fine_money: this.prizeFineForm.value.money,
      };
    }
    return body;
  }
  changePrizeFine(event): void {
    console.log(event.target);

    // this.isPrize = !this.isPrize;
  }
  submitForm(): void {
    if (this.prizeFineId) {
      const body = this.checkPrizeFine();
      console.log(body);

      this.prizrFineService.updatePrizeFine(this.prizeFineId, body).subscribe(
        (_) => {
          this.router.navigate(['/', 'prize-fine-money']);
          this.toastService.show('sửa thành công', {
            classname: 'bg-success text-light',
            delay: 3000,
          });
        },
        (err) => {
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
        }
      );
    } else {
      const body = this.checkPrizeFine();
      console.log(body);

      this.prizrFineService.createPrize(body).subscribe(
        (data) => {
          this.toastService.show(data.message, {
            classname: 'bg-success text-light',
            delay: 3000,
          }),
            this.router.navigate(['/', 'prize-fine-money']);
        },
        (err) => {
          this.toastService.show(err.message, {
            classname: 'bg-danger text-light',
            delay: 3000,
          });
        }
      );
    }
  }
}
