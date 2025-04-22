import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Shipper } from 'src/app/models/Shipper';
import { ShipperService } from 'src/app/_services/shipper.service';
@Component({
  selector: 'app-shipper-add',
  templateUrl: './shipper-add.component.html',
  styleUrls: ['./shipper-add.component.css']
})
export class ShipperAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  shipper: Shipper = new Shipper();
  private CurrentItemId: any;
  constructor(private shipperService: ShipperService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Transporteur';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.shipperService.getShipper(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Transporteur';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      CompanyName : new FormControl(null , [Validators.required]),
      Phone : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      CompanyName : new FormControl(data.CompanyName , [Validators.required]),
      Phone : new FormControl(data.Phone , [Validators.required]),

    });
  }
  Retour() {
    this.router.navigate(['/shipper']);
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
          this.updateShipper( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.CompanyName != null && this.form.value.Phone != null) {
        this.shipperService.register(this.form.value).subscribe(data => {
            this.shipper = new Shipper();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/shipper']);
          },
          error => console.log(error));
      }
    }
  }
  private updateShipper(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, CompanyName: this.form.value.CompanyName,Phone:this.form.value.Phone}
    this.shipperService.updateShipper(obj,id)
      .subscribe(data => {
        this.shipper = new Shipper();
        this.router.navigate(['/shipper']);
      }, error => console.log(error));
  }
}
