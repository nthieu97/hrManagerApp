import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastsService } from 'src/app/service/toasts.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '[class.ngb-toasts]': 'true' },
})
export class ToastComponent implements OnInit {
  constructor(public toastService: ToastsService) {}

  ngOnInit(): void {}
  // tslint:disable-next-line: typedef
  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
