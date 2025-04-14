import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Matiere} from "../../models/Matiere";
import {Affectation} from "../../models/Affectation";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AffectationService} from "../../_services/affectation.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-affectation-enseignant',
  templateUrl: './list-affectation-enseignant.component.html',
  styleUrls: ['./list-affectation-enseignant.component.css']
})
export class ListAffectationEnseignantComponent implements OnInit {

  displayedColumns: string[] = ['enseignant_id','group_id','matiere_id','Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Affectation>;
  // @ts-ignore
  affectations: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router, private  affectationService:AffectationService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.affectations);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  deleteAffectation(id:any) {
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
        this.affectationService.deleteAffectation(id).subscribe(
          data => {
            location.reload();
          },
          error => console.log(error));
        Swal.fire(
          '',
          'Affectation est supprimé avec succès.',
          'success'
        );
      }
    });
  }

  updateAffectation(id:any) {
    this.router.navigate(['affectation/update/', id]);
  }

  private reloadData() {
    this.affectations = this.affectationService.getListAffectation().subscribe(things => {
      this.dataSource.data = things;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
