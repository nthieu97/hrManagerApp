import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-update-ot',
  templateUrl: './update-ot.component.html',
  styleUrls: ['./update-ot.component.css']
})
export class UpdateOtComponent implements OnInit {
dropdownSettings={} ;
  selectedItems = [];
  dropdownList = []
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe((data) => {
      console.log(data.data);
      this.dropdownList = data.data
    });
    this.selectedItems = [];

     this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'full_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };


  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  handleSubmit(envent) {

  }



}
