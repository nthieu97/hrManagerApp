import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbAlertModule,
  NgbButtonsModule,
  NgbDropdownModule,
  NgbPaginationModule,
  NgbRadioGroup,
  NgbToastModule,
  NgbModule,
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
    NgbModule,
  ],
  exports: [
    NgbDropdownModule,
    NgbAlertModule,
    NgbToastModule,
    NgbPaginationModule,
    NgbButtonsModule,
    NgbModule,
  ],
})
export class BsModule {}
