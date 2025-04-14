import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
const Groupe_API = 'http://127.0.0.1:8000/api/api/Group/';

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

export class GroupService {
  constructor(private http: HttpClient) { }
  getListGroup(): Observable<any> {
    return this.http.get(
      Groupe_API + 'getAll',httpOptions
    );
  }
  getGroup(id: any): Observable<any> {
    return this.http.get(
      Groupe_API + `getById/${id}`,
      httpOptions
    );
  }
  register(group: Object): Observable<Object> {
    return this.http.post(
      Groupe_API + 'add',group,
      httpOptions
    );
  }
  updateGroup(group: Object): Observable<Object> {
    return this.http.post(
      Groupe_API + 'edit',group,

      httpOptions
    );
  }
  deleteGroup(id :Object): Observable<any> {
    return this.http.get(
      Groupe_API + `delete/${id}`,
      httpOptions
    );
  }
}
