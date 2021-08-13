import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbAlertModule,
  NgbButtonsModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRadioGroup,
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
    NgbButtonsModule,
  ],
  exports: [
    NgbDropdownModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPaginationModule,
    NgbButtonsModule,
  ],
})
export class BsModule {}
