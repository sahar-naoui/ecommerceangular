import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { EmployeeService } from 'src/app/_services/employee.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  employee: Employee = new Employee();
  private CurrentItemId: any;
  constructor(private employeeService: EmployeeService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Employee';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.employeeService.getEmployee(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Employee';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      FirstName : new FormControl(null , [Validators.required]),
      LastName : new FormControl(null , [Validators.required]),
      Title : new FormControl(null , [Validators.required]),
      HireDate : new FormControl(null),
      BirthDate : new FormControl(null),
      TitleOfCourtesy : new FormControl(null , [Validators.required]),
      Address : new FormControl(null , [Validators.required]),
      City : new FormControl(null , [Validators.required]),
      Region : new FormControl(null , [Validators.required]),
      PostalCode : new FormControl(null , [Validators.required]),
      Country : new FormControl(null , [Validators.required]),
      HomePhone : new FormControl(null , [Validators.required]),
      Extension : new FormControl(null , [Validators.required]),
      Notes : new FormControl(null , [Validators.required]),
      ReportsTo : new FormControl(null , [Validators.required]),
      Salary : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      FirstName : new FormControl(data.FirstName , [Validators.required]),
      LastName : new FormControl(data.LastName , [Validators.required]),
      Title : new FormControl(data.Title , [Validators.required]),
      BirthDate : new FormControl(data.BirthDate),      
      HireDate : new FormControl(data.HireDate),
      TitleOfCourtesy : new FormControl(data.TitleOfCourtesy , [Validators.required]),
      Address : new FormControl(data.Address , [Validators.required]),
      City : new FormControl(data.City , [Validators.required]),
      Region : new FormControl(data.Region , [Validators.required]),
      PostalCode : new FormControl(data.PostalCode , [Validators.required]),
      Country : new FormControl(data.Country , [Validators.required]),
      HomePhone : new FormControl(data.HomePhone , [Validators.required]),
      Extension : new FormControl(data.Extension , [Validators.required]),
      Notes : new FormControl(data.Notes , [Validators.required]),
      ReportsTo : new FormControl(data.ReportsTo , [Validators.required]),
      Salary : new FormControl(data.Salary , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/employee']);
  }
  onSub() {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      // @ts-ignore
      Swal.fire({
        title: 'Voulez-vous enregistrer les modifications?',
        showCancelButton: true,
        confirmButtonText: 'Enregistrer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.updateEmployee( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.FirstName != null&&this.form.value.LastName != null&& this.form.value.Title != null&& 
        this.form.value.TitleOfCourtesy != null&& this.form.value.Address != null&& 
        this.form.value.City != null&& this.form.value.Region != null&& 
        this.form.value.PostalCode != null&& this.form.value.Country != null&& 
        this.form.value.HomePhone != null&& this.form.value.Extension != null&& 
        this.form.value.Notes != null&& this.form.value.ReportsTo != null&& 
        this.form.value.Salary != null) {
          this.employeeService.register(this.form.value).subscribe(
            data => {
              console.log('Réponse backend:', data);
              this.employee = new Employee();
              Swal.fire('', 'Action effectuée avec succès!', 'success');
              this.router.navigate(['/employee']);
            },
            error => console.log('Erreur lors de l’enregistrement:', error)
          );
          
      }
    }
  }
  private updateEmployee(id: any) {
    console.log(this.form.value);
    // @ts-ignore
    let obj: any = {
      FirstName: this.form.value.FirstName,
      LastName: this.form.value.LastName,
      Title: this.form.value.Title,
      TitleOfCourtesy: this.form.value.TitleOfCourtesy,
      Address: this.form.value.Address,
      City: this.form.value.City,
      Region: this.form.value.Region,
      PostalCode: this.form.value.PostalCode,
      Country: this.form.value.Country,
      HomePhone: this.form.value.HomePhone,
      Extension: this.form.value.Extension,
      Notes: this.form.value.Notes,
      ReportsTo: this.form.value.ReportsTo,
      Salary: this.form.value.Salary
    };
    if (this.form.value.BirthDate) {
      obj.BirthDate = this.form.value.BirthDate;
    }
    if (this.form.value.HireDate) {
      obj.HireDate = this.form.value.HireDate;
    }
    this.employeeService.updateEmployee(obj,id)
      .subscribe(data => {
        this.employee = new Employee();
        this.router.navigate(['/employee']);
      }, error => console.log(error));
  }

}
