import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/_services/customer.service';
@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  customer: Customer = new Customer();
  private CurrentItemId: any;
  constructor(private customerService: CustomerService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Cutomer';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.customerService.getCustomer(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Cutomer';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      CustomerID : new FormControl(null , [Validators.required]),
      CompanyName : new FormControl(null , [Validators.required]),
      ContactName : new FormControl(null , [Validators.required]),
      ContactTitle : new FormControl(null , [Validators.required]),
      City : new FormControl(null , [Validators.required]),
      Region : new FormControl(null , [Validators.required]),
      PostalCode : new FormControl(null , [Validators.required]),
      Country : new FormControl(null , [Validators.required]),
      Phone : new FormControl(null , [Validators.required]),
      Fax : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      CustomerID : new FormControl(data.CustomerID , [Validators.required]),
      CompanyName : new FormControl(data.CompanyName , [Validators.required]),
      ContactName : new FormControl(data.ContactName , [Validators.required]),
      ContactTitle : new FormControl(data.ContactTitle , [Validators.required]),
      City : new FormControl(data.City , [Validators.required]),
      Region : new FormControl(data.Region , [Validators.required]),
      PostalCode : new FormControl(data.PostalCode , [Validators.required]),
      Country : new FormControl(data.Country , [Validators.required]),
      Phone : new FormControl(data.Phone , [Validators.required]),
      Fax : new FormControl(data.Fax , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/customer']);
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
          this.updateCustomer( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.CustomerID != null&&this.form.value.CompanyName != null&& 
        this.form.value.ContactName != null&& this.form.value.ContactTitle != null&& 
        this.form.value.City != null&& this.form.value.Region != null&& 
        this.form.value.PostalCode != null&& this.form.value.Country != null&& 
        this.form.value.Phone != null&& this.form.value.Fax != null) {
        this.customerService.register(this.form.value).subscribe(data => {
            this.customer = new Customer();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/customer']);
          },
          error => console.log(error));
      }
    }
  }
  private updateCustomer(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id,CustomerID:this.form.value.CustomerID,CompanyName:this.form.value.CompanyName,ContactName:this.form.value.ContactName,
      ContactTitle:this.form.value.ContactTitle,City:this.form.value.City,Region:this.form.value.Region,PostalCode:this.form.value.PostalCode,
      Country:this.form.value.Country,Phone:this.form.value.Phone,Fax:this.form.value.Fax
    }
    this.customerService.updateCustomer(obj,id)
      .subscribe(data => {
        this.customer = new Customer();
        this.router.navigate(['/customer']);
      }, error => console.log(error));
  }

}
