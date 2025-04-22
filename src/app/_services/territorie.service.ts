import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Territorie_API = 'http://127.0.0.1:8000/api/territories';
@Injectable({
  providedIn: 'root'
})
export class TerritorieService {

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
 
   getListTerritorie(): Observable<any> {
     return this.http.get(Territorie_API, this.getHttpOptions());
   }
 
   getTerritorie(id: any): Observable<any> {
     return this.http.get(`${Territorie_API}/${id}`, this.getHttpOptions());
   }
 
   register(territorie: Object): Observable<Object> {
     return this.http.post(Territorie_API, territorie, this.getHttpOptions());
   }
 
   updateTerritorie(territorie: Object, id: Object): Observable<Object> {
     return this.http.put(`${Territorie_API}/${id}`, territorie, this.getHttpOptions());
   }
 
   deleteTerritorie(id: Object): Observable<any> {
     return this.http.delete(`${Territorie_API}/${id}`, this.getHttpOptions());
   }
 }
 