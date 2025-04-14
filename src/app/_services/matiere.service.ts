import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

const Matiere_API = 'http://127.0.0.1:8000/api/api/Matiere/';

const token=window.sessionStorage.getItem("token")
let httpOptions = {
  headers: new HttpHeaders({})
};
if (token!=null)
{
  // @ts-ignore
  const cleanedToken = token.replace(/"/g, '');
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':cleanedToken
    })
  };
}
else {
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
}

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }
  getListMatiere(): Observable<any> {
    return this.http.get(
      Matiere_API + 'getAll',httpOptions
    );
  }
  register(matiere: Object): Observable<Object> {
    return this.http.post(
      Matiere_API + 'add',matiere,

      httpOptions
    );
  }
  updateMatiere(matiere: Object): Observable<Object> {
    return this.http.post(
      Matiere_API + 'edit',matiere,

      httpOptions
    );
  }
  deleteMatiere(id :Object): Observable<any> {
    return this.http.get(
      Matiere_API + `delete/${id}`,
      httpOptions
    );
  }
  getMatiere(id :Object): Observable<any> {
    return this.http.get(
      Matiere_API + `getById/${id}`,
      httpOptions
    );
  }
}
