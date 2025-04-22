import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Categorie_API = 'http://127.0.0.1:8000/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

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

  getListCategorie(): Observable<any> {
    return this.http.get(Categorie_API, this.getHttpOptions());
  }

  getCategorie(id: any): Observable<any> {
    return this.http.get(`${Categorie_API}/${id}`, this.getHttpOptions());
  }

  register(categorie: Object): Observable<Object> {
    return this.http.post(Categorie_API, categorie, this.getHttpOptions());
  }

  updateCategorie(categorie: Object, id: Object): Observable<Object> {
    return this.http.put(`${Categorie_API}/${id}`, categorie, this.getHttpOptions());
  }

  deleteCategorie(id: Object): Observable<any> {
    return this.http.delete(`${Categorie_API}/${id}`, this.getHttpOptions());
  }
}
