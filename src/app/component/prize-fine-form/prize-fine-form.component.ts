import { Component, OnInit } from '@angular/core';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { responsePrizeFine } from 'src/app/model/prize.model'


@Component({
  selector: 'app-prize-fine-form',
  templateUrl: './prize-fine-form.component.html',
  styleUrls: ['./prize-fine-form.component.css']
})
export class PrizeFineFormComponent implements OnInit {
  employees = [];
  prizeForm: FormGroup;
  checkPrize: boolean = false;
  checkFine: boolean = false
  prizeFineId: string

  constructor(private prizrFineService: PrizeFineMoneyService,
    private employeeService: EmployeeService,
    private router: Router,
    private atr: ActivatedRoute

  ) {
    this.prizeForm = this.createForm();
   }

  ngOnInit(): void {
    this.atr.params.subscribe((params) => {
      this.prizeFineId = params.id;
      console.log(this.prizeFineId);
      if (this.prizeFineId) {
        this.prizrFineService.getDetailPrizeFine(this.prizeFineId).subscribe((data) => {
          console.log(data);
          this.prizeForm.setValue({
            thuong: data.data.thuong,
            phat: data.data.phat,
            user_id: data.data.user_id,
            name: data.data.name,
            prize_fine_money:data.data.prize_fine_money
          })
        })
      }
    })
    this.getEmployees();
  }
  createForm() {
    return new FormGroup({
      user_id: new FormControl('',[Validators.required]),
      prize_fine_money: new FormControl('',Validators.required),
      thuong: new FormControl('',Validators.required),
      phat: new FormControl('',Validators.required),
      name:new FormControl('',Validators.required)
    })
  }


  getEmployees() {
    this.employeeService.getAllUser().subscribe((data) => {
      console.log(data);
      this.employees = data.data
    })
  }
get f() {
   return this.prizeForm.controls;
  }
  submitForm(event) {
    event.preventDefault();
    this.prizrFineService.createPrize(this.prizeForm.value).subscribe(data => {
     this.prizeForm = data.data
       this.router.navigate(['/','prize-fine-money'])
    })
  }
}
