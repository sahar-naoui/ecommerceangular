import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
const Affectaion_API = 'http://127.0.0.1:8000/api/api/GroupEnseignatMatiere/';

const token=window.sessionStorage.getItem("token")
let httpOptions = {
  headers: new HttpHeaders({})
};
if (token!=null){
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
export class AffectationService {
  constructor(private http: HttpClient) { }
  getListGroupByEnseignant(id :Object): Observable<any> {
    return this.http.get(
      Affectaion_API + `GetListGroupByEnseignant/${id}`,
      httpOptions
    );
  }
  updateAffectation(affectation: Object): Observable<Object> {
    return this.http.post(
      Affectaion_API + 'edit',affectation,

      httpOptions
    );
  }
  getAffectation(id :Object): Observable<any> {
    return this.http.get(
      Affectaion_API + `getById/${id}`,
      httpOptions
    );
  }
  deleteAffectation(id :Object): Observable<any> {
    return this.http.get(
      Affectaion_API + `delete/${id}`,
      httpOptions
    );
  }
  register(affectation: Object): Observable<Object> {
    return this.http.post(
      Affectaion_API + 'add',affectation,
      httpOptions
    );
  }
  getListAffectation(): Observable<any> {
    return this.http.get(
      Affectaion_API + 'getAll',httpOptions
    );
  }
}
