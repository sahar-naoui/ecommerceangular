import { Component, OnInit } from '@angular/core';
import {Matiere} from "../../models/Matiere";
import {MatiereService} from "../../_services/matiere.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {GroupService} from "../../_services/group.service";
import {Group} from "../../models/Group";

@Component({
  selector: 'app-ajouter-group',
  templateUrl: './ajouter-group.component.html',
  styleUrls: ['./ajouter-group.component.css']
})
export class AjouterGroupComponent implements OnInit {

  form: any ;
  title: any;
  buttonadd: any;
  groupe: Group = new Group();
  private CurrentItemId: any;
  constructor(private groupService: GroupService,private router: Router , private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Groupe';
      this.buttonadd = 'Modifier ';
      this.groupService.getGroup(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Groupe';
      this.initForm();
    }
  }

  private initForm() {
    this.form = new FormGroup({
      name : new FormControl(null , [Validators.required]),
      nbEtudiant : new FormControl(null , [Validators.required]),
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
          this.updateGroupe( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.name != null && this.form.value.nbEtudiant != null) {
        this.groupService.register(this.form.value).subscribe(data => {
            this.groupe = new Group();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/groupe/list']);
          },
          error => console.log(error));
      }
    }

  }

  Retour() {
    this.router.navigate(['/groupe/list']);
  }

  private initForm1(data: any) {
    this.form = new FormGroup({
      name : new FormControl(data.name , [Validators.required]),
      nbEtudiant : new FormControl(data.nbEtudiant , [Validators.required]),

    });
  }

  private updateGroupe(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, name: this.form.value.name,nbEtudiant:this.form.value.nbEtudiant}
    this.groupService.updateGroup(obj)
      .subscribe(data => {
        this.groupe = new Group();
        this.router.navigate(['/groupe/list']);
      }, error => console.log(error));
  }

}
