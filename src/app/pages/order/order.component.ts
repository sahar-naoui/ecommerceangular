import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { OrderService } from 'src/app/_services/order.service';
import { Order } from 'sequelize';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ["CustomerID","EmployeeID","OrderDate","RequiredDate","ShippedDate","ShipVia","Freight","ShipAddress","ShipCity","ShipRegion","ShipPostalCode","ShipCountry",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Order>;
  // @ts-ignore
  orders: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private orderservice:OrderService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.orders);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.orders = this.orderservice.getListOrder().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateOrder(id) {
    this.router.navigate(['order/edit/', id]);
  }

  // @ts-ignore
  deleteOrder(id) {
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
        this.orderservice.deleteOrder(id).subscribe(
          data => {
            if (data.message != "Failed")
            {
              Swal.fire(
                '',
                'Order est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Order déjà affectée !!',
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
