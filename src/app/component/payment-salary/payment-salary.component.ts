// import { Component, OnInit } from '@angular/core';
// import { SalaryService } from 'src/app/service/salary.service';
// import { ActivatedRoute } from '@angular/router';
// import { AuthService } from 'src/app/service/auth.service';
// @Component({
//   selector: 'app-payment-salary',
//   templateUrl: './payment-salary.component.html',
//   styleUrls: ['./payment-salary.component.css']
// })
// export class PaymentSalaryComponent implements OnInit {
//   id:any;
//   paymentSalary:any;
//   isAdmin: boolean;
//   salaryDetail: any;
//   payment= true;
//   status=true;
//   constructor(
//     private salaryService : SalaryService,
//     private route:ActivatedRoute,
//     private authService: AuthService,

//   ) { }

//   ngOnInit(): void {
//     this.id = this.route.snapshot.params['id'];
//     this.paymentSala();

//   }
//   paymentSala(){
//     this.salaryService.getPaymentSalary(this.id).subscribe(res => {
//       this.paymentSalary = res.data;
//     })
//   }
//   changePay(){
//     this.payment = !this.payment;
  
//     this.status = !this.status ;
//   }
// }
