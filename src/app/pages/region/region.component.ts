import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Region} from "../../models/Region";
import {Router} from "@angular/router";
import {RegionService} from "../../_services/region.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {
  displayedColumns: string[] = ["RegionDescription",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Region>;
  // @ts-ignore
  regions: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private regionService:RegionService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.regions);
  }

  ngOnInit(): void {

    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.regions = this.regionService.getListRegion().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateRegion(id) {
    this.router.navigate(['region/edit/', id]);
  }

  // @ts-ignore
  deleteRegion(id) {
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
        this.regionService.deleteRegion(id).subscribe(
          (data: any) => {
            Swal.fire(
              'Supprimée !',
              'La région a été supprimée avec succès.',
              'success'
            );
            this.reloadData(); // recharge sans recharger la page
          },
          (error) => {
            if (error.status === 500 && error.error.message && error.error.message.includes('Integrity constraint violation')) {
              Swal.fire(
                'Suppression impossible',
                'Cette région est liée à d\'autres enregistrements (comme Territorie) et ne peut pas être supprimée.',
                'error'
              );
            } else {
              Swal.fire(
                'Erreur',
                'Une erreur inattendue est survenue.',
                'error'
              );
            }
            console.error('Erreur de suppression de région :', error);
          }
        );
      }
    });
  }

}
