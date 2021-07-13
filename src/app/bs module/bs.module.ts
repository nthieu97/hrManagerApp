import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbAlertModule,
  NgbDropdownModule,
  NgbToastModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbDropdownModule, NgbAlertModule, NgbToastModule],
  exports: [NgbDropdownModule, NgbAlertModule, NgbToastModule],
})
export class BsModule {}
