import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const Employee_API = 'http://127.0.0.1:8000/api/employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

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
    getListEmployee(): Observable<any> {
      return this.http.get(Employee_API, this.getHttpOptions());
    }
  
    getEmployee(id: any): Observable<any> {
      return this.http.get(`${Employee_API}/${id}`, this.getHttpOptions());
    }
  
    register(employee: any): Observable<any> {
      const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        const pad = (n: number): string => n < 10 ? '0' + n : n.toString();
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
               `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
      };
    
      // Convertir les dates si elles existent
      if (employee.BirthDate) {
        employee.BirthDate = formatDate(employee.BirthDate);
      }
    
      if (employee.HireDate) {
        employee.HireDate = formatDate(employee.HireDate);
      }
    
      return this.http.post(Employee_API, employee, this.getHttpOptions());
    }
    
  
    updateEmployee(employee: Object, id: Object): Observable<Object> {
      return this.http.put(`${Employee_API}/${id}`, employee, this.getHttpOptions());
    }
  
    deleteEmployee(id: Object): Observable<any> {
      return this.http.delete(`${Employee_API}/${id}`, this.getHttpOptions());
    }
}
