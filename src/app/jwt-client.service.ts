import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) {
  }

  public genrateToken(request: any) {
    return this.http.post("http://127.0.0.1:8000/api/auth", request, {responseType: 'text' as 'json'});
  }

  public welcome(token: any) {
    let tokenStr = 'Bearer' + token;
    const headers = new HttpHeaders().set("Authorization", tokenStr);
    return this.http.get("http://127.0.0.1:8000/api/", {headers,responseType: 'text' as 'json'});
  }
}
