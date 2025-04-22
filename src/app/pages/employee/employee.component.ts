import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/_services/employee.service';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ["FirstName","LastName","Title","TitleOfCourtesy","BirthDate","HireDate","Address","City","Region","PostalCode","Country","HomePhone","Extension","Notes","ReportsTo","Salary",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Employee>;
  // @ts-ignore
  employees: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private employeeService:EmployeeService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.employees);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.employees = this.employeeService.getListEmployee().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateEmployee(id) {
    this.router.navigate(['employee/edit/', id]);
  }

  // @ts-ignore
  // @ts-ignore
deleteEmployee(id) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: 'Vous ne pourrez pas revenir en arrière !',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Supprimer',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      this.employeeService.deleteEmployee(id).subscribe(
        (data: any) => {
          Swal.fire(
            'Supprimé !',
            'L\'employé a été supprimé avec succès.',
            'success'
          );
          this.reloadData(); // recharge les données sans reload page
        },
        (error) => {
          if (error.status === 500 && error.error.message && error.error.message.includes('Integrity constraint violation')) {
            Swal.fire(
              'Suppression impossible',
              'Cet employé est lié à d\'autres enregistrements (ex. : Employee territorie, Orders etc..) et ne peut pas être supprimé.',
              'error'
            );
          } else {
            Swal.fire(
              'Erreur',
              'Une erreur inattendue est survenue.',
              'error'
            );
          }
          console.error('Erreur de suppression:', error);
        }
      );
    }
  });
}

}
