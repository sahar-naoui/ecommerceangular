import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { Territorie } from 'src/app/models/Territorie';
import { TerritorieService } from 'src/app/_services/territorie.service';
import { RegionService } from 'src/app/_services/region.service';

@Component({
  selector: 'app-territorie',
  templateUrl: './territorie.component.html',
  styleUrls: ['./territorie.component.css']
})
export class TerritorieComponent implements OnInit {

  displayedColumns: string[] = ["TerritoryID","TerritoryDescription","RegionID",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Territorie>;
  // @ts-ignore
  territories: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private territorieservice:TerritorieService,  private regionService: RegionService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.territories);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.territories = this.territorieservice.getListTerritorie().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateTerritorie(id) {
    this.router.navigate(['territorie/edit/', id]);
  }

  // @ts-ignore
  deleteTerritorie(id) {
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
        this.territorieservice.deleteTerritorie(id).subscribe(
          data => {
            if (data.message != "Failed")
            {
              Swal.fire(
                '',
                'Territorie est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Territorie déjà affectée !!',
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
