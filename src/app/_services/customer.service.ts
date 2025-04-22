import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Customer_API = 'http://127.0.0.1:8000/api/customers';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  private getHttpOptions() {
    let token = window.sessionStorage.getItem("token");
    if (token) {
      const cleanedToken = token.replace(/"/g, '');
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanedToken}`
        })
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
    }
  }
    getListCustomer(): Observable<any> {
      return this.http.get(Customer_API, this.getHttpOptions());
    }
  
    getCustomer(id: any): Observable<any> {
      return this.http.get(`${Customer_API}/${id}`, this.getHttpOptions());
    }
  
    register(customer: Object): Observable<Object> {
      return this.http.post(Customer_API, customer, this.getHttpOptions());
    }
  
    updateCustomer(customer: Object, id: Object): Observable<Object> {
      return this.http.put(`${Customer_API}/${id}`, customer, this.getHttpOptions());
    }
  
    deleteCustomer(id: Object): Observable<any> {
      return this.http.delete(`${Customer_API}/${id}`, this.getHttpOptions());
    }
}
