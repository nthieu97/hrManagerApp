import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/service/attendance.service';
import { ToastsService } from 'src/app/service/toasts.service';
@Component({
  selector: 'app-update-ot',
  templateUrl: './update-ot.component.html',
  styleUrls: ['./update-ot.component.css'],
})
export class UpdateOtComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  dropdownList = [];
  formOT: FormGroup;
  listItem = [];
  constructor(
    private employeeService: EmployeeService,
    private attenService: AttendanceService,
    private toastService:ToastsService
  ) {
    this.formOT = this.createForm();
  }

  ngOnInit(): void {
    this.employeeService.getAllUser().subscribe((data) => {
      console.log(data.data);
      this.dropdownList = data.data;
    });
    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'user_account',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  createForm(): FormGroup {
    return new FormGroup({
      listUsers: new FormControl('', Validators.required),
    });
  }
  get f(): any {
    return this.formOT.controls;
  }

  onItemSelect(item: any): void {
    this.listItem.push(item.id);
    console.log(this.listItem);
    
  }
  onDeSelect(item:any):void{
    console.log(item, 'deselect');
    this.listItem = this.listItem.filter(data =>
      data !== item.id
    )
    console.log(this.listItem);
  }
  onSelectAll(items: any): void {
    this.listItem.push(items.id);
    console.log(this.listItem);
    
  }
  onDeSelectAll(items:any):void{
    console.log(items);
    this.listItem = []
    console.log(this.listItem);
  }
  handleSubmit() {
    this.attenService.updateOT(this.listItem).subscribe((data) => {
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
    });
  }
}
