import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from '@swimlane/ngx-charts';
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
  paginatePrize(page: string): Observable<any> {
    return this.http.get(this.URL_API, { params: { page } });
  }
  createPrize(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/create/', object);
  }

  createFine(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/create/', object);
  }
  deletePrizeFine(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/delete/' + id, {});
  }
  updatePrizeFine(id: string, object: any): Observable<any> {
    return this.http.post(this.URL_API + '/update/' + id, { object });
  }

  getDetailPrizeFine(id: string): Observable<any> {
    return this.http.get(this.URL_API + '/getdetail/' + id, {});
  }

  getAllDelete(): Observable<any> {
    return this.http.get(this.URL_API + '/getAllDelete')
  }
  destroyPrize(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/destroy/' + id)
  }
  restorePrize(id: string, object: any): Observable<any> {
    return this.http.post(this.URL_API + '/khoi_phuc/' + id, { object })
  }
}
