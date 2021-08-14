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
  deleteOT(id:string):Observable<any>{
    return this.http.delete(this.URL_API + '/delete/'+id,{})
  }
  destroyOT(id:string):Observable<any>{
    return this.http.delete(this.URL_API +'/destroy/'+id)
  }
  listOTByLeader():Observable<any>{
    return this.http.get(this.URL_API + '/danh_sach_tang_ca_by_leader')
  }
}
