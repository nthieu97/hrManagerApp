import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbAlertModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbDropdownModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPaginationModule,
  ],
  exports: [
    NgbDropdownModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPaginationModule,
  ],
})
export class BsModule {}
