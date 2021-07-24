import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/service/attendance.service';
@Component({
  selector: 'app-update-ot',
  templateUrl: './update-ot.component.html',
  styleUrls: ['./update-ot.component.css']
})
export class UpdateOtComponent implements OnInit {
dropdownSettings:IDropdownSettings={} ;
  selectedItems = [];
  dropdownList = [];
  formOT: FormGroup;
  listItem = []
  constructor(private employeeService: EmployeeService,private attenService:AttendanceService)
  {
    this.formOT = this.createForm();
  }

  ngOnInit(): void {
    this.employeeService.getAllUser().subscribe((data) => {
      console.log(data.data);
      this.dropdownList = data.data
    });
    this.selectedItems = [];

     this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'user_account',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }

  createForm() {
    return new FormGroup({
        listUsers:new FormControl('',Validators.required)
      })
  }
  get f() {
    return this.formOT.controls
  }

  onItemSelect(item: any) {
    console.log(item);
    this.listItem.push(item)
    console.log(this.listItem);

  }
  onSelectAll(items: any) {
    console.log(items);
    this.listItem.push(items)
    console.log(this.listItem);

  }

  handleSubmit(event) {
    event.preventDefault();
    this.attenService.updateOT(this.listItem).subscribe((data) => {
        console.log(data.user_id);

      })
  }



}
