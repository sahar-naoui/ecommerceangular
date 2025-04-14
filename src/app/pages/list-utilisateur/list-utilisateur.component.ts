import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../models/User";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import { Subscription } from 'rxjs';
import {AuthService} from "../../_services/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent implements OnInit {
  displayedColumns: string[] = [ 'username', 'email', 'role','Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<User>;
  // @ts-ignore
  users: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private authService: AuthService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.users);
  }
  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.users = this.authService.getListUser().subscribe(things => {
      // @ts-ignore
      let list = [];
      // @ts-ignore
      things.forEach( item =>{
        list.push({id:item.id,username: item.username, email: item.email, role: item.roles[0].name});
      });
       // @ts-ignore
      this.dataSource.data = list;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  deleteUtilisateur(id: any) {
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
        this.authService.deleteUser(id).subscribe(
          data => {
            if (data.message != "Failed")
            {
              Swal.fire(
                '',
                'Utilisateur est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Utilisateur déjà affectée à un groupe . Tu dois supprimée l\'affectation tout d\'abors !!',
                'error'
              );
            }
            location.reload();
          },
          error => console.log(error));
      }
    });
  }
  updateUtilisateur(id:any) {
    this.router.navigate(['user/update/', id]);
  }
}
