import { Component, OnInit } from '@angular/core';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prize-fine-form',
  templateUrl: './prize-fine-form.component.html',
  styleUrls: ['./prize-fine-form.component.css']
})
export class PrizeFineFormComponent implements OnInit {
  employees = [];
  prizeForm: FormGroup;
  checkPrize: boolean = false;
  checkFine:boolean=false
  constructor(private prizrFineService: PrizeFineMoneyService,
    private employeeService: EmployeeService,
  private router:Router
  ) {
    this.prizeForm = this.createForm();
   }

  ngOnInit(): void {
    this.getEmployees()
  }
  createForm() {
    return new FormGroup({
      user_id: new FormControl(),
      prize_fine_money: new FormControl(),
      thuong: new FormControl(),
      phat: new FormControl(),
      name:new FormControl()
    })
  }
  getEmployees() {
    this.employeeService.getAllEmployee().subscribe((data) => {
      console.log(data);
      this.employees = data.data
    })
  }

  submitForm(event) {
    event.preventDefault();
    this.prizrFineService.createPrize(this.prizeForm.value).subscribe(data => {
     this.prizeForm = data.data
       this.router.navigate(['/','prize-fine-money'])
    })
  }
}
