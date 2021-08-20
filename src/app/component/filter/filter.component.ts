import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  constructor() {}
  @ViewChild('formFilter') formFilter: NgForm;
  @Input() employees: { name: string; id: string }[];
  @Output() filtered = new EventEmitter();
  yearStart = 2018;
  years: number[] = [];
  ngOnInit(): void {
    const date = new Date();
    const yearLast = date.getFullYear();
    const years = [];
    for (let year = this.yearStart; year <= yearLast; year++) {
      years.push(year);
    }
    this.years = years;
  }
  handleSubmit(): void {
    this.filtered.emit(this.formFilter.value);
  }
}
