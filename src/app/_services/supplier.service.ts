import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const Supplier_API = 'http://127.0.0.1:8000/api/suppliers';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  getListSupplier(): Observable<any> {
    return this.http.get(Supplier_API);
  }

  getSupplier(id: any): Observable<any> {
    return this.http.get(`${Supplier_API}/${id}`);
  }

  register(supplier: any): Observable<any> {
    return this.http.post(Supplier_API, supplier);
  }

  updateSupplier(supplier: Object, id: Object): Observable<Object> {
    return this.http.put(`${Supplier_API}/${id}`, supplier);
  }

  deleteSupplier(id: Object): Observable<any> {
    return this.http.delete(`${Supplier_API}/${id}`);
  }
}
