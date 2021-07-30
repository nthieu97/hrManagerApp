import { Component, OnInit } from '@angular/core';
import { PrizeFineMoneyService } from 'src/app/service/prize-fine-money.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { responsePrizeFine } from 'src/app/model/prize.model'
import { ToastsService } from 'src/app/service/toasts.service';


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
    private atr: ActivatedRoute,
    private toastService:ToastsService
  ) {
    
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
  ngOnInit(): void {
    this.prizeForm = this.createForm();
    this.atr.params.subscribe((params) => {
      this.prizeFineId = params.id;
      console.log(this.prizeFineId);
      if (this.prizeFineId) {
        this.prizrFineService.getDetailPrizeFine(this.prizeFineId).subscribe((data) => {
          console.log(data);
          this.prizeForm.setValue({
            thuong: data.data.prize_fine_id,
            phat: data.data.prize_fine_id,
            user_id: data.data.user_id.id,
            name: data.data.prize_id.name,
            prize_fine_money: data.data.prize_id.prize_money
          })
        })
      }
      console.log(this.prizeForm.value);
    })
    this.getEmployees();
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
    if (this.prizeFineId ) {
      this.prizrFineService.updatePrizeFine(this.prizeFineId,this.prizeForm.value).subscribe((data) => {
        console.log(data);
        this.router.navigate(['/', 'prize-fine-money'])
      })

    }
    this.prizrFineService.createPrize(this.prizeForm.value).subscribe(data => {
      this.toastService.show(data.message,{
        classname:'bg-success text-light',
        delay:3000
      }),
      (err:any)=>{
        this.toastService.show(err.message,{
          classname:'bg-danger text-light',
          delay:3000
        })
      }
    //  this.prizeForm = data.data
       this.router.navigate(['/','prize-fine-money'])
    })
  }
}
