import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Matiere} from "../../models/Matiere";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {CourService} from "../../_services/cour.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-cours',
  templateUrl: './list-cours.component.html',
  styleUrls: ['./list-cours.component.css']
})
export class ListCoursComponent implements OnInit {
  role: any;

  displayedColumns: string[] = ['enseignant','group','matiere','dateTirage','file','Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Matiere>;
  // @ts-ignore
  cours: Subscription;
  image: any;
  status: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private courService:CourService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.cours);
  }
  ngOnInit(): void {
    this.role = window.sessionStorage.getItem("role")
    this.role = this.role.replace(/"/g, '');
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    if(this.role !="ROLE_TIRAGE"){
      this.cours = this.courService.getListCour().subscribe(things => {
        // @ts-ignore
        let list = [];
        // @ts-ignore
        things.forEach( item =>{
          switch (item.filetype) {
            case 'application/pdf':
              this.image="assets/img/pdf.png"
              break;
            case 'image/jpeg':
              this.image="assets/img/jpg.png"
              break;
            case 'image/png':
              this.image="assets/img/png.png"
              break;
            case 'application/vnd.ms-excel':
              this.image="assets/img/xls.png"
              break;
            case 'text/csv':
              this.image="assets/img/csv.png"
              break;
            case 'text/plain':
              this.image="assets/img/txt.png"
              break;
            default:
              this.image="assets/img/doc.png"
          }
          list.push({image:this.image,filetype:item.filetype,id:item.id,file: item.id, matiere: item.matiere, enseignant: item.enseignant,dateTirage: item.DateTirage, group: item.group});
        });
        // @ts-ignore
        this.dataSource.data = list;
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }else{
      this.cours = this.courService.getListCourTirage().subscribe(things => {
        // @ts-ignore
        let list = [];
        // @ts-ignore
        things.forEach( item =>{
          switch (item.filetype) {
            case 'application/pdf':
              this.image="assets/img/pdf.png"
              break;
            case 'image/jpeg':
              this.image="assets/img/jpg.png"
              break;
            case 'image/png':
              this.image="assets/img/png.png"
              break;
            case 'application/vnd.ms-excel':
              this.image="assets/img/xls.png"
              break;
            case 'text/csv':
              this.image="assets/img/csv.png"
              break;
            case 'text/plain':
              this.image="assets/img/txt.png"
              break;
            default:
              this.image="assets/img/doc.png"
          }
          if(item.status==1){
            this.status="check"
          }else{
            this.status="close"
          }
          list.push({status: this.status,image:this.image,filetype:item.filetype,id:item.id,file: item.id, matiere: item.matiere, enseignant: item.enseignant,dateTirage: item.DateTirage, group: item.group});
        });
        // @ts-ignore
        this.dataSource.data = list;
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

  }
  updateCour(id: any) {
    this.router.navigate(['cours/update/', id]);
  }
  deleteCour(id:any) {
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
        this.courService.deleteCour(id).subscribe(
          data => {
            location.reload();
          },
          error => console.log(error));
        Swal.fire(
          '',
          'Cours est supprimé avec succès.',
          'success'
        );
      }
    });
  }
  downloadCour(id: any) {
    this.courService.downloadCour(id).subscribe(
      data => {
      },
      error => console.log(error));
  }
  downloadCourTirage(id: any) {
    this.courService.downloadCourTirage(id).subscribe(
      data => {
        location.reload();
      },
      error => console.log(error));
  }
}
