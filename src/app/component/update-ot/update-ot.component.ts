import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
@Component({
  selector: 'app-update-ot',
  templateUrl: './update-ot.component.html',
  styleUrls: ['./update-ot.component.css']
})
export class UpdateOtComponent implements OnInit {
  listEmployee = [];
  idOT;
  constructor(private employeeService: EmployeeService,
  private router:Router) { }

  ngOnInit(): void {
    // this.getAllEmployee()

  }

  handleSubmit(envent) {

  }

//   getAllEmployee() {
//     this.employeeService.getListUser().subscribe((data) => {
//       this.listEmployee = data.data
// console.log(data)
//     })
//   }

}
