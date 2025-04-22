import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { OrderdetailService } from 'src/app/_services/orderdetail.service';
import { OrderService } from 'src/app/_services/order.service';
import { ProductService } from 'src/app/_services/product.service';
import { OrderDetail } from 'src/app/models/Orderdetail';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  
    displayedColumns: string[] = ["OrderID","ProductID","UnitPrice","Quantity","Discount",'Action'];
    // @ts-ignore
    dataSource: MatTableDataSource<OrderDetail>;
    // @ts-ignore
    orderdetails: Subscription;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
    // @ts-ignore
    @ViewChild(MatSort, {static: true}) sort: MatSort;
    constructor(private router:Router,private orderdetailservice:OrderdetailService,private orderservice: OrderService,
      private productservice: ProductService) {
      // @ts-ignore
      this.dataSource = new MatTableDataSource(this.orderdetails);
    }
  
    ngOnInit(): void {
      this.reloadData();
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
    private reloadData() {
      this.orderdetails = this.orderdetailservice.getListOrderdetail().subscribe(things => {
        this.dataSource.data = things.Data;
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  
    // @ts-ignore
    updateOrderdetail(id) {
      this.router.navigate(['orderdetail/edit/', id]);
    }
  
    // @ts-ignore
    deleteOrderdetail(id) {
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
          this.orderdetailservice.deleteOrderdetail(id).subscribe(
            data => {
              if (data.message != "Failed")
              {
                Swal.fire(
                  '',
                  'Order détail est supprimé avec succès.',
                  'success'
                );
                location.reload();
              }
              else
              {
                Swal.fire(
                  '',
                  'Order détail déjà affectée !!',
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
  