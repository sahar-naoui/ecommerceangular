import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Supplier } from 'src/app/models/Supplier';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-supplier-add',
  templateUrl: './supplier-add.component.html',
  styleUrls: ['./supplier-add.component.css']
})
export class SupplierAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  supplier: Supplier = new Supplier();
  private CurrentItemId: any;
  constructor(private supplierService: SupplierService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Fournisseur';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.supplierService.getSupplier(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Fournisseur';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      CompanyName : new FormControl(null , [Validators.required]),
      ContactName : new FormControl(null , [Validators.required]),
      ContactTitle : new FormControl(null , [Validators.required]),
      Address : new FormControl(null , [Validators.required]),
      City : new FormControl(null , [Validators.required]),
      Region : new FormControl(null , [Validators.required]),
      PostalCode : new FormControl(null , [Validators.required]),
      Country : new FormControl(null , [Validators.required]),
      Phone : new FormControl(null , [Validators.required]),
      Fax : new FormControl(null , [Validators.required]),
      HomePage : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      CompanyName : new FormControl(data.CompanyName , [Validators.required]),
      ContactName : new FormControl(data.ContactName , [Validators.required]),
      ContactTitle : new FormControl(data.ContactTitle , [Validators.required]),
      Address : new FormControl(data.Address , [Validators.required]),
      City : new FormControl(data.City , [Validators.required]),
      Region : new FormControl(data.Region , [Validators.required]),
      PostalCode : new FormControl(data.PostalCode , [Validators.required]),
      Country : new FormControl(data.Country , [Validators.required]),
      Phone : new FormControl(data.Phone , [Validators.required]),
      Fax : new FormControl(data.Fax , [Validators.required]),
      HomePage : new FormControl(data.HomePage , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/supplier']);
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
          this.updateSupplier( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.CompanyName != null&&this.form.value.ContactName != null&&
        this.form.value.ContactTitle != null&& this.form.value.Address != null&& 
        this.form.value.City != null&& this.form.value.Region != null&& 
        this.form.value.PostalCode != null&& this.form.value.Country != null&& 
        this.form.value.Phone != null&& this.form.value.Fax != null&& 
        this.form.value.HomePage != null) {
          this.supplierService.register(this.form.value).subscribe(
            data => {
              console.log('Réponse backend:', data);
              this.supplier = new Supplier();
              Swal.fire('', 'Action effectuée avec succès!', 'success');
              this.router.navigate(['/supplier']);
            },
            error => console.log('Erreur lors de l’enregistrement:', error)
          );
          
      }
    }
  }
  private updateSupplier(id: any) {
    console.log(this.form.value);
    // @ts-ignore
    let obj: any = {
      CompanyName: this.form.value.CompanyName,
      ContactName: this.form.value.ContactName,
      ContactTitle: this.form.value.ContactTitle,
      Address: this.form.value.Address,
      City: this.form.value.City,
      Region: this.form.value.Region,
      PostalCode: this.form.value.PostalCode,
      Country: this.form.value.Country,
      Phone: this.form.value.Phone,
      Fax: this.form.value.Fax,
      HomePage: this.form.value.HomePage,
    };
    this.supplierService.updateSupplier(obj,id)
      .subscribe(data => {
        this.supplier = new Supplier();
        this.router.navigate(['/supplier']);
      }, error => console.log(error));
  }

}
