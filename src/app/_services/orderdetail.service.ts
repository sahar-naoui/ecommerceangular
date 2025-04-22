import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Orderdetail_API = 'http://127.0.0.1:8000/api/orderdetails';
@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {
  constructor(private http: HttpClient) {}

  getListOrderdetail(): Observable<any> {
    return this.http.get(Orderdetail_API);
  }

  getOrderdetail(id: any): Observable<any> {
    return this.http.get(`${Orderdetail_API}/${id}`);
  }

  register(orderdetail: any): Observable<any> {
    return this.http.post(Orderdetail_API, orderdetail);
  }

  updateOrderdetail(orderdetail: Object, id: Object): Observable<Object> {
    return this.http.put(`${Orderdetail_API}/${id}`, orderdetail);
  }

  deleteOrderdetail(id: Object): Observable<any> {
    return this.http.delete(`${Orderdetail_API}/${id}`);
  }
}
