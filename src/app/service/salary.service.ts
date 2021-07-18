import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'luong';
}
