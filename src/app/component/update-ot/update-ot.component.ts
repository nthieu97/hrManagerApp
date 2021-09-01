import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttendanceService } from 'src/app/service/attendance.service';
import { ToastsService } from 'src/app/service/toasts.service';
import { OTServiceService } from 'src/app/service/otservice.service';
@Component({
  selector: 'app-update-ot',
  templateUrl: './update-ot.component.html',
  styleUrls: ['./update-ot.component.css'],
})
export class UpdateOtComponent implements OnInit {
  dropdownSettings: IDropdownSettings = {};
  selectedItems = [];
  selectedItems2 = [];
  dropdownList = [];
  formOT: FormGroup;
  formOT2: FormGroup;
  listItem = [];
  listID = [];
  constructor(
    private employeeService: EmployeeService,
    private attenService: AttendanceService,
    private toastService: ToastsService,
    private otService: OTServiceService
  ) {
    this.formOT = this.createForm();
    this.formOT2 = this.createForm2();
  }

  ngOnInit(): void {
    this.employeeService.getListUser().subscribe((data) => {
      this.dropdownList = data.data;
    });
    this.selectedItems = [];
    this.selectedItems2 = [];
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
  createForm2(): FormGroup {
    return new FormGroup({
      listUsers2: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      time_tang_ca: new FormControl('', Validators.required),
    });
  }
  get f(): any {
    return this.formOT.controls;
  }
  get f2(): any {
    return this.formOT2.controls;
  }

  onItemSelect(item: any): void {
    this.listItem.push(item.id);
  }
  onDeSelect(item: any): void {
    this.listItem = this.listItem.filter((data) => data !== item.id);
  }
  onSelectAll(items: any): void {
    const arr = [];

    items.forEach((item) => {
      arr.push(item.id);
    });
    this.listItem = arr;
  }
  onDeSelectAll(items: any): void {
    this.listItem = [];
  }
  // select 2
  onItemSelect2(item: any): void {
    this.listID.push(item.id);
  }

  onDeSelect2(item: any): void {
    this.listID = this.listID.filter((data) => data !== item.id);
  }
  onSelectAll2(items: any): void {
    const arr = [];
    items.forEach((item) => {
      arr.push(item.id);
    });
    this.listID = arr;
  }
  onDeSelectAll2(items: any): void {
    this.listID = [];
  }
  handleSubmit() {
    this.attenService.updateOT(this.listItem).subscribe(
      (data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
      },
      err => {
        this.toastService.show(err.error.message, {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
  }

  handleSubmit2() {
    this.otService.createOT(this.formOT2.value).subscribe(
      (data) => {
        this.toastService.show(data.message, {
          classname: 'bg-success text-light',
          delay: 3000,
        });
      },
      err => {
        this.toastService.show(err.error.message, {
          classname: 'bg-danger text-light',
          delay: 3000,
        });
      }
    );
    this.formOT2.setValue({
      listUsers2: '',
      note: '',
      time_tang_ca: '',
    });
  }
}
