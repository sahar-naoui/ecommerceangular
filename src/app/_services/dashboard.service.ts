import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getListShipper(): Observable<any> {
    return this.http.get(`${this.apiUrl}/shippers`);
  }

  getListOrder(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders`);
  }

  getListProduct(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getListSupplier(): Observable<any> {
    return this.http.get(`${this.apiUrl}/suppliers`);
  }

  getListCustomer(): Observable<any> {
    return this.http.get(`${this.apiUrl}/customers`);
  }

  getListCategorie(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getListEmployee(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  getListTerritory(): Observable<any> {
    return this.http.get(`${this.apiUrl}/territories`);
  }
  
  getListRegion(): Observable<any> {
    return this.http.get(`${this.apiUrl}/regions`);
  }
  getListOrderDetail(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orderdetails`);
  }
}