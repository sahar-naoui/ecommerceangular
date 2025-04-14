import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatiereService} from "../../_services/matiere.service";
import {Matiere} from "../../models/Matiere";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-matieres',
  templateUrl: './list-matieres.component.html',
  styleUrls: ['./list-matieres.component.css']
})
export class ListMatieresComponent implements OnInit {
  displayedColumns: string[] = ['label','Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Matiere>;
  // @ts-ignore
  matieres: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private matiereService: MatiereService , private router:Router) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.matieres);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private reloadData() {
    this.matieres = this.matiereService.getListMatiere().subscribe(things => {
      this.dataSource.data = things;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateMatiere(id: any) {
    this.router.navigate(['matiere/update/', id]);
  }


  deleteMatiere(id:any) {
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
        this.matiereService.deleteMatiere(id).subscribe(
          data => {
            if (data.message != "Failed")
            {
              Swal.fire(
                '',
                'Matiere est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Matière déjà affectée !!',
                'error'
              );
            }
          },
          error => console.log(error));
      }
    });
  }
}
