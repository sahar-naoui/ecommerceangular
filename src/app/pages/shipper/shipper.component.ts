import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { ShipperService } from 'src/app/_services/shipper.service';
import { Shipper } from 'src/app/models/Shipper';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {
  
 displayedColumns: string[] = ["CompanyName","Phone",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Shipper>;
  // @ts-ignore
  shippers: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private shipperservice:ShipperService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.shippers);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.shippers = this.shipperservice.getListShipper().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateShipper(id) {
    this.router.navigate(['shipper/edit/', id]);
  }
  // @ts-ignore
  deleteShipper(id) {
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
        this.shipperservice.deleteShipper(id).subscribe(
          data => {
             if (data.message != "Failed")
             {
              Swal.fire(
                '',
                'Catégorie est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Catégorie déjà affectée !!',
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
