import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrizeFineMoneyService {
  constructor(private http: HttpClient) {}
  URL_API = environment.baseURL + 'prize_fine_money';
  getAllPrize(keyword: any): Observable<any> {
    if (keyword.length > 0) {
      return this.http.get(this.URL_API + '?keyword=' + keyword);
    }
    return this.http.get(this.URL_API);
  }

  createPrize(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/create/', object);
  }

  createFine(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/create/', object);
  }
}
