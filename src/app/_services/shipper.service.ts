import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Shipper_API = 'http://127.0.0.1:8000/api/shippers';
@Injectable({
  providedIn: 'root'
})
export class ShipperService {

  constructor(private http: HttpClient) {}

  getListShipper(): Observable<any> {
    return this.http.get(Shipper_API);
  }

  getShipper(id: any): Observable<any> {
    return this.http.get(`${Shipper_API}/${id}`);
  }

  register(shipper: any): Observable<any> {
    return this.http.post(Shipper_API, shipper);
  }

  updateShipper(shipper: Object, id: Object): Observable<Object> {
    return this.http.put(`${Shipper_API}/${id}`, shipper);
  }

  deleteShipper(id: Object): Observable<any> {
    return this.http.delete(`${Shipper_API}/${id}`);
  }
}
