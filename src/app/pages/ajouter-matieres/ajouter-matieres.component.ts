import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatiereService} from "../../_services/matiere.service";
import {Matiere} from "../../models/Matiere";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ajouter-matieres',
  templateUrl: './ajouter-matieres.component.html',
  styleUrls: ['./ajouter-matieres.component.css']
})
export class AjouterMatieresComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  matiere: Matiere = new Matiere();
  private CurrentItemId: any;
  constructor(private matiereService: MatiereService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Matière';
      this.buttonadd = 'Modifier ';
      this.matiereService.getMatiere(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.matiere = data;
          this.initForm1(data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Matière';
      this.initForm();
    }
   }

  private initForm() {
    this.form = new FormGroup({
      label : new FormControl(null , [Validators.required]),
    });
  }
  onSub() {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      // @ts-ignore
      Swal.fire({
        title: 'Voulez-vous enregistrer les modifications?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Enregistrer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.updateMatiere( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }else{
      if(this.form.value.label != null) {
        this.matiereService.register(this.form.value).subscribe(data => {
            this.matiere = new Matiere();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/matiere/list']);
          },
          error => console.log(error));
      }
    }


  }

  Retour() {
    this.router.navigate(['/matiere/list']);
  }

  private initForm1(data: any) {
    this.form = new FormGroup({
      label : new FormControl(data.label , [Validators.required]),

    });
  }

  private updateMatiere(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, label: this.form.value.label}
    this.matiereService.updateMatiere(obj)
      .subscribe(data => {
        this.matiere = new Matiere();
        this.router.navigate(['/matiere/list']);
      }, error => console.log(error));
  }

}
