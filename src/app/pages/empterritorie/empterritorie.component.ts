import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { TerritorieService } from 'src/app/_services/territorie.service';
import { Empterritorie } from 'src/app/models/Empterritorie';
import { EmpterritorieService } from 'src/app/_services/empterritorie.service';
@Component({
  selector: 'app-empterritorie',
  templateUrl: './empterritorie.component.html',
  styleUrls: ['./empterritorie.component.css']
})
export class EmpterritorieComponent implements OnInit {

  displayedColumns: string[] = ["EmployeeID","TerritoryID",'Action'];
  // @ts-ignore
  dataSource: MatTableDataSource<Empterritorie>;
  // @ts-ignore
  empterritories: Subscription;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator | undefined;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private router:Router,private territorieservice:TerritorieService,private empterritorieservice: EmpterritorieService) {
    // @ts-ignore
    this.dataSource = new MatTableDataSource(this.empterritories);
  }

  ngOnInit(): void {
    this.reloadData();
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  private reloadData() {
    this.empterritories = this.empterritorieservice.getListEmpterritorie().subscribe(things => {
      this.dataSource.data = things.Data;
      // @ts-ignore
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // @ts-ignore
  updateEmpterritorie(id) {
    this.router.navigate(['empterritorie/edit/', id]);
  }

  // @ts-ignore
  deleteEmpterritorie(id) {
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
        this.empterritorieservice.deleteEmpterritorie(id).subscribe(
          data => {
            if (data.message != "Failed")
            {
              Swal.fire(
                '',
                'Employé Territorie est supprimé avec succès.',
                'success'
              );
              location.reload();
            }
            else
            {
              Swal.fire(
                '',
                'Employé Territorie déjà affectée !!',
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
