import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {Router} from "@angular/router";
import { CustomerService } from 'src/app/_services/customer.service';
import { Customer } from 'src/app/models/Customer';
import Swal from 'sweetalert2';
import {Subscription} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  displayedColumns: string[] = ["CustomerID","CompanyName","ContactName","ContactTitle","Address","City","Region","PostalCode","Country","Phone","Fax",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Customer>;
  // @ts-ignore
  customers: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private customerService:CustomerService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.customers);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.customers = this.customerService.getListCustomer().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateCustomer(id) {
    this.router.navigate(['customer/edit/', id]);
  }

  // @ts-ignore
  deleteCustomer(id) {
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
        // @ts-ignore
        this.customerService.deleteCustomer(id).subscribe(
          data => {
            if (data.message != "Failed")
            {
              Swal.fire(
                '',
                'Customer est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Customer déjà affectée !!',
                'error'
              );
            }
            location.reload();
          },
          error => console.log(error));
      }
    });
  }
}
