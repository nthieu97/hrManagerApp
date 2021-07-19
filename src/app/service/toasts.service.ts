import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastsService {
  constructor() {}
  toasts: any[] = [];

  // tslint:disable-next-line: typedef
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  // tslint:disable-next-line: typedef
  remove(toast) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }
}
