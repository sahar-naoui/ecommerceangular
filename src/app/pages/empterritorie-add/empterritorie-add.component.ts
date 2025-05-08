import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Territorie } from 'src/app/models/Territorie';
import { TerritorieService } from 'src/app/_services/territorie.service';
import { Empterritorie } from 'src/app/models/Empterritorie';
import { Employee } from 'src/app/models/Employee';
import { EmpterritorieService } from 'src/app/_services/empterritorie.service';
import { EmployeeService } from 'src/app/_services/employee.service';
@Component({
  selector: 'app-empterritorie-add',
  templateUrl: './empterritorie-add.component.html',
  styleUrls: ['./empterritorie-add.component.css']
})
export class EmpterritorieAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  empterritorie: Empterritorie = new Empterritorie();
    // @ts-ignore
  emplyees: Observable<Employee[]>;
  // @ts-ignore
  territories: Observable<Territorie[]>;
  private CurrentItemId: any;
  constructor(private empterritorieservice: EmpterritorieService,private territorieService: TerritorieService,private employeeService: EmployeeService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.employeeService.getListEmployee().subscribe(data => {
      this.emplyees = data.Data; 
    });
    this.territorieService.getListTerritorie().subscribe(data => {
      this.territories = data.Data; 
    });
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Employee Territorie';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.empterritorieservice.getEmpterritorie(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Employee Territorie';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      TerritoryID : new FormControl(null , [Validators.required]),
      EmployeeID : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      TerritoryID : new FormControl(data.TerritoryID , [Validators.required]),
      EmployeeID : new FormControl(data.EmployeeID , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/empterritorie']);
  }

  onSub() {
    if (this.CurrentItemId) {
      this.updateEmpterritorie(this.CurrentItemId);
    } else {
      this.empterritorieservice.register(this.form.value).subscribe(
        data => {
          this.empterritorie = new Empterritorie();
          Swal.fire('', 'Ajout effectué avec succès!', 'success');
          this.router.navigate(['/empterritorie']);
        },
        error => {
          console.error(error);
          const backendMessage = error.error?.message || '';
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: backendMessage || 'Erreur interne du serveur',
            footer: 'Code erreur : ' + error.status
          });
        }
      );
    }
  }
   
  private updateEmpterritorie(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, TerritoryID: this.form.value.TerritoryID,EmployeeID:this.form.value.EmployeeID}
    this.empterritorieservice.updateEmpterritorie(obj,id)
      .subscribe(data => {
        this.empterritorie = new Territorie();
        this.router.navigate(['/empterritorie']);
      }, error => console.log(error));
  }
}
