import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbDropdownModule, NgbAlertModule],
  exports: [NgbDropdownModule, NgbAlertModule],
})
export class BsModule {}
