import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Order_API = 'http://127.0.0.1:8000/api/orders';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

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
 
   getListOrder(): Observable<any> {
     return this.http.get(Order_API, this.getHttpOptions());
   }
 
   getOrder(id: any): Observable<any> {
     return this.http.get(`${Order_API}/${id}`, this.getHttpOptions());
   }
 
   register(order: Object): Observable<Object> {
     return this.http.post(Order_API, order, this.getHttpOptions());
   }
 
   updateOrder(order: Object, id: Object): Observable<Object> {
     return this.http.put(`${Order_API}/${id}`, order, this.getHttpOptions());
   }
 
   deleteOrder(id: Object): Observable<any> {
     return this.http.delete(`${Order_API}/${id}`, this.getHttpOptions());
   }
 }
 