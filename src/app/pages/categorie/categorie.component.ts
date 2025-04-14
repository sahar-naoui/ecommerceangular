import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Categorie} from "../../models/Categorie";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {GroupService} from "../../_services/group.service";
import {Router} from "@angular/router";
import {CategorieService} from "../../_services/categorie.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  displayedColumns: string[] = ["CategoryName","Description",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Categorie>;
  // @ts-ignore
  categories: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private categorieservice:CategorieService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.categories = this.categorieservice.getListCategorie().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateCategorie(id) {
    this.router.navigate(['categorie/edit/', id]);
  }
  // @ts-ignore
  deleteCategorie(id) {
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
        this.categorieservice.deleteCategorie(id).subscribe(
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
                'Groupe déjà affectée !!',
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
