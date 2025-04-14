import { Injectable } from '@angular/core';
import {v4 as uuidv4} from "uuid";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const Categorie_API = 'http://127.0.0.1:8000/api/categories';
const boundary = uuidv4();

let token=window.sessionStorage.getItem("token")
let httpOptions = {
  headers: new HttpHeaders({})
};
let headers1 = {
  headers: new HttpHeaders({})
};
let headers2 = {
  headers: new HttpHeaders({})
};
if (token!=null)
{
  // @ts-ignore
  const cleanedToken = token.replace(/"/g, '');
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':"Bearer "+cleanedToken,
    })
  };
  headers1 = {
    headers: new HttpHeaders({
      'Authorization':"Bearer "+cleanedToken,
    })
  };
  headers2 = {
    headers: new HttpHeaders({
      'Authorization':"Bearer "+cleanedToken,
      'responseType': 'blob'
    })
  };

}
else {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  headers1 = {headers: new HttpHeaders({})};
  headers2 = {headers: new HttpHeaders({})};
}

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }
  getListCategorie(): Observable<any> {
    return this.http.get(
      Categorie_API ,httpOptions
    );
  }
  getCategorie(id: any): Observable<any> {
    return this.http.get(
      Categorie_API + `/${id}`,
      httpOptions
    );
  }
  register(categorie: Object): Observable<Object> {
    return this.http.post(
      Categorie_API,categorie,
      httpOptions
    );
  }
  updateCategorie(categorie: Object,id :Object): Observable<Object> {
    return this.http.put(
      Categorie_API + `/${id}`,categorie,

      httpOptions
    );
  }
  deleteCategorie(id :Object): Observable<any> {
    return this.http.delete(
      Categorie_API + `/${id}`,
      httpOptions
    );
  }
}
