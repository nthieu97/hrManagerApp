import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OTServiceService {

  constructor(private http: HttpClient) { }
  URL_API = environment.baseURL + 'tangca';
  createOT(object: any): Observable<any> {
    return this.http.post(this.URL_API + '/addTangCa/', object);
  }
  deleteOT(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/delete/' + id, {})
  }
  destroyOT(id: string): Observable<any> {
    return this.http.delete(this.URL_API + '/destroy/' + id)
  }
  listOTByLeader(): Observable<any> {
    return this.http.get(this.URL_API + '/danh_sach_tang_ca_by_leader')
  }
  getAllDeleteOT(): Observable<any> {
    return this.http.get(this.URL_API + '/getAllDelete')
  }

  restorseOT(id: string, object: any): Observable<any> {
    return this.http.post(this.URL_API + '/khoi_phuc/' + id, { object })
  }
  //xác nhận tăng ca nhân viên
  confirmOT(id: string): Observable<any> {
    return this.http.post(this.URL_API + '/xac_nhan_tang_ca/' + id, { comfirm: 'yes' });
  }
  notConfirmOT(id:string):Observable<any>{
    return this.http.post(this.URL_API + '/xac_nhan_tang_ca/' + id, {});
  }
  getListOTByUser(): Observable<any> {
    return this.http.get(this.URL_API + '/danh_sach_tang_ca_by_user')
  }

  restoreAll(array: any): Observable<any> {
    return this.http.post(this.URL_API + '/khoi_phuc_all/', array)
  }
  destroyAll(array: any): Observable<any> {
    return this.http.post(this.URL_API + '/destroyAll/', array)
  }
  deleteAll(array: any): Observable<any> {
    return this.http.post(this.URL_API + '/delete_all/', array)
  }

}
