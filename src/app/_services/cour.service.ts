import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import { v4 as uuidv4 } from 'uuid';
const Cour_API = 'http://127.0.0.1:8000/api/enseignant/cour/';
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
      'Authorization':cleanedToken,
    })
  };
  headers1 = {
    headers: new HttpHeaders({
      'Authorization':cleanedToken,
    })
  };
 headers2 = {
    headers: new HttpHeaders({
      'Authorization':cleanedToken,
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
export class CourService {

  constructor(private http: HttpClient) { }
  register(cours: Object): Observable<Object> {
    return this.http.post(
      Cour_API + 'add',cours,
      headers1
    );
  }
  updateCour(cour: Object): Observable<Object> {
    return this.http.post(
      Cour_API + 'edit',cour,
      headers1
    );
  }
  getListCour(): Observable<any> {
    return this.http.get(
      Cour_API + 'getAll',httpOptions
    );
  }
  getListCourTirage(): Observable<any> {
    return this.http.get(
      Cour_API + 'getListCourTirage',httpOptions
    );
  }
  deleteCour(id :Object): Observable<any> {
    return this.http.get(
      Cour_API + `delete/${id}`,
      httpOptions
    );
  }
  getCour(id: any): Observable<any> {
    return this.http.get(
      Cour_API + `getById/${id}`,
      httpOptions
    );
  }
  downloadCour(id :Object): Observable<any> {
    let headers = new HttpHeaders();
    // @ts-ignore
    const cleanedToken = token.replace(/"/g, '');
    headers = headers.append("Authorization", cleanedToken);
    return this.http.get(
      Cour_API + `download/${id}`,
      { headers: headers, responseType: 'blob', observe: 'response' }
    ).pipe(
      tap(response => {
        const contentDisposition = response.headers.get("Content-Disposition");
        // @ts-ignore
        const fileName = contentDisposition.split("; ")[1].split("=")[1].replace(/"/g,'');
        // @ts-ignore
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
      }),
    );
  }
  downloadCourTirage(id :Object): Observable<any> {
    let headers = new HttpHeaders();
    // @ts-ignore
    const cleanedToken = token.replace(/"/g, '');
    headers = headers.append("Authorization", cleanedToken);
    return this.http.get(
      Cour_API + `downloadTirage/${id}`,
      { headers: headers, responseType: 'blob', observe: 'response' }
    ).pipe(
      tap(response => {
        const contentDisposition = response.headers.get("Content-Disposition");
        // @ts-ignore
        const fileName = contentDisposition.split("; ")[1].split("=")[1].replace(/"/g,'');
        // @ts-ignore
        const url = window.URL.createObjectURL(response.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
      }),
    );
  }
}
