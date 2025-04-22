import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Empterritorie_API = 'http://127.0.0.1:8000/api/employeesterritories';
@Injectable({
  providedIn: 'root'
})
export class EmpterritorieService {

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
 
   getListEmpterritorie(): Observable<any> {
     return this.http.get(Empterritorie_API, this.getHttpOptions());
   }
 
   getEmpterritorie(id: any): Observable<any> {
     return this.http.get(`${Empterritorie_API}/${id}`, this.getHttpOptions());
   }
 
   register(empterritorie: Object): Observable<Object> {
     return this.http.post(Empterritorie_API, empterritorie, this.getHttpOptions());
   }
 
   updateEmpterritorie(empterritorie: Object, id: Object): Observable<Object> {
     return this.http.put(`${Empterritorie_API}/${id}`, empterritorie, this.getHttpOptions());
   }
 
   deleteEmpterritorie(id: Object): Observable<any> {
     return this.http.delete(`${Empterritorie_API}/${id}`, this.getHttpOptions());
   }
 }
 