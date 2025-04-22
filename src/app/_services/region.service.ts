import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Region_API = 'http://127.0.0.1:8000/api/regions';
@Injectable({
  providedIn: 'root'
})
export class RegionService {

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
  getListRegion(): Observable<any> {
    return this.http.get(Region_API, this.getHttpOptions());
  }

  getRegion(id: any): Observable<any> {
    return this.http.get(`${Region_API}/${id}`, this.getHttpOptions());
  }

  register(region: Object): Observable<Object> {
    return this.http.post(Region_API, region, this.getHttpOptions());
  }

  updateRegion(region: Object, id: Object): Observable<Object> {
    return this.http.put(`${Region_API}/${id}`, region, this.getHttpOptions());
  }

  deleteRegion(id: Object): Observable<any> {
    return this.http.delete(`${Region_API}/${id}`, this.getHttpOptions());
  }
}
