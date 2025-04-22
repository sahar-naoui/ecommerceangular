import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Product_API = 'http://127.0.0.1:8000/api/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getListProduct(): Observable<any> {
    return this.http.get(Product_API);
  }

  getProduct(id: any): Observable<any> {
    return this.http.get(`${Product_API}/${id}`);
  }

  register(product: any): Observable<any> {
    return this.http.post(Product_API, product);
  }

  updateProduct(product: Object, id: Object): Observable<Object> {
    return this.http.put(`${Product_API}/${id}`, product);
  }

  deleteProduct(id: Object): Observable<any> {
    return this.http.delete(`${Product_API}/${id}`);
  }
}
