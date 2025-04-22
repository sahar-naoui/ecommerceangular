import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "../../_services/categorie.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Categorie} from "../../models/Categorie";
import Swal from "sweetalert2";

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.css']
})
export class CategorieAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  categorie: Categorie = new Categorie();
  private CurrentItemId: any;
  constructor(private categorieService: CategorieService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Categorie';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.categorieService.getCategorie(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Catégorie';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      CategoryName : new FormControl(null , [Validators.required]),
      Description : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      CategoryName : new FormControl(data.CategoryName , [Validators.required]),
      Description : new FormControl(data.Description , [Validators.required]),

    });
  }
  Retour() {
    this.router.navigate(['/categorie']);
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
          this.updateCategorie( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.CategoryName != null && this.form.value.Description != null) {
        this.categorieService.register(this.form.value).subscribe(data => {
            this.categorie = new Categorie();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/categorie']);
          },
          error => console.log(error));
      }
    }
  }
  private updateCategorie(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, CategoryName: this.form.value.CategoryName,Description:this.form.value.Description}
    this.categorieService.updateCategorie(obj,id)
      .subscribe(data => {
        this.categorie = new Categorie();
        this.router.navigate(['/categorie']);
      }, error => console.log(error));
  }
}
