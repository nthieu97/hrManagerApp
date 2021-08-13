import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalaryService } from 'src/app/service/salary.service';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.css']
})
export class SalaryDetailComponent implements OnInit {
  id:any;
  salaryDetail:any=[];
  isAdmin: boolean;
  totalWork:any;
  totalLeave:any;
  moneyFine:any;
  moneyPrize:any;
  
  constructor(
    private route:ActivatedRoute,
    private salaryService:SalaryService,
    private authService:AuthService
    ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
   
    this.id = this.route.snapshot.params['id']
    this. getSalaryDetail();
  }
  getSalaryDetail():void{
    this.salaryService.getSalaryDetail(this.id).subscribe((data)=>{
      // console.log(data);
      this.salaryDetail = data.data.luong;
      this.totalWork = data.data.tong_ngay_lam;
      this.totalLeave=data.data.tong_ngay_xin_nghi;
      this.moneyFine = data.data.get_fine_money;
      this.moneyPrize = data.data.get_pize_money;
      // console.log(data);
      // this.salaryDetail = [0].data;
      
      // this.salaryDetail = res.0;
      // this.salaryDetail = res.number;
    })
  }
  
}

