import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {StorageService} from "./storage.service";

const AUTH_API = 'http://127.0.0.1:8000/api/auth/';
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
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private storageService: StorageService) {
    // console.log(this.storageService.getToken())
  }

  getListRole(): Observable<any> {

    return this.http.get(
      AUTH_API + 'listRole',
      httpOptions
    );
  }
  getListUser(): Observable<any> {

    return this.http.get(
      AUTH_API + 'list_utilisateur',
      httpOptions
    );
  }
  getListEnseignant(): Observable<any> {

    return this.http.get(
      AUTH_API + 'getByEnseignant',
      httpOptions
    );
  }
  getUser(id: any): Observable<any> {
    return this.http.get(
      AUTH_API + `getById/${id}`,
      httpOptions
    );
  }
  getNbEnseignant(): Observable<any> {
    return this.http.get(
      AUTH_API + `nbEnseignant`,
      httpOptions
    );
  }
  updateUser(user: Object): Observable<Object> {
    return this.http.post(
      AUTH_API + 'EditUser',user,

      httpOptions
    );
  }
  deleteUser(id :Object): Observable<any> {
    return this.http.get(
      AUTH_API + `DeleteUser/${id}`,
      httpOptions
    );
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        email: username,
        password,
      },
      httpOptions
    );
  }

  register(user:Object): Observable<any> {
    return this.http.post(
      AUTH_API + 'register', user,httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}
