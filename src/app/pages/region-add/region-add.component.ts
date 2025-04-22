import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Region} from "../../models/Region";
import {RegionService} from "../../_services/region.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-region-add',
  templateUrl: './region-add.component.html',
  styleUrls: ['./region-add.component.css']
})
export class RegionAddComponent implements OnInit {

  form: any ;
  title: any;
  buttonadd: any;
  region: Region = new Region();
  private CurrentItemId: any;
  constructor(private regionService: RegionService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Région';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.regionService.getRegion(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Région';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      RegionDescription : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      RegionDescription : new FormControl(data.RegionDescription , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/region']);
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
          this.updateRegion( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.RegionDescription != null) {
        this.regionService.register(this.form.value).subscribe(data => {
            this.region = new Region();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/region']);
          },
          error => console.log(error));
      }
    }
  }
  private updateRegion(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id,RegionDescription:this.form.value.RegionDescription}
    this.regionService.updateRegion(obj,id)
      .subscribe(data => {
        this.region = new Region();
        this.router.navigate(['/region']);
      }, error => console.log(error));
  }
}
