import {Component, OnInit} from '@angular/core';
import {Affectation} from "../../models/Affectation";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Group} from "../../models/Group";
import {GroupService} from "../../_services/group.service";
import {Matiere} from "../../models/Matiere";
import {MatiereService} from "../../_services/matiere.service";
import {AuthService} from "../../_services/auth.service";
import {User} from "../../models/User";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {AffectationService} from "../../_services/affectation.service";

@Component({
  selector: 'app-affectation-enseignant',
  templateUrl: './affectation-enseignant.component.html',
  styleUrls: ['./affectation-enseignant.component.css']
})
export class AffectationEnseignantComponent implements OnInit {
  form: any;
  title: any;
  buttonadd: any;
  affectation: Affectation = new Affectation();
  // @ts-ignore
  groups: Observable<Group[]>;
  // @ts-ignore
  matieres: Observable<Matiere[]>;
  // @ts-ignore
  enseignants: Observable<User[]>;
  private CurrentItemId: any;


  constructor(private authService: AuthService, private matiereService: MatiereService, private affectationService: AffectationService,
              private router: Router, private groupService: GroupService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.groups = this.groupService.getListGroup();
    this.matieres = this.matiereService.getListMatiere();
    this.enseignants = this.authService.getListEnseignant();
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Affectation Enseignant';
      this.buttonadd = 'Modifier ';
      this.affectationService.getAffectation(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data);
        }, error => console.log(error));
    } else {
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Affectation Enseignant';
      this.initForm();
    }
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      matiere_id : new FormControl(data.matiere_id , [Validators.required]),
      group_id : new FormControl(data.group_id , [Validators.required]),
      enseignant_id : new FormControl(data.enseignant_id , [Validators.required]),
    });
  }
  private initForm() {
    this.form = new FormGroup({
      matiere_id: new FormControl(null, [Validators.required]),
      group_id: new FormControl(null, [Validators.required]),
      enseignant_id: new FormControl(null, [Validators.required]),
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
          this.updateAffectation( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else {
      if (this.form.value.group_id != null && this.form.value.enseignant_id != null && this.form.value.matiere_id != null) {
        this.affectationService.register(this.form.value).subscribe(data => {
            this.affectation = new Affectation();
            // @ts-ignore
            if (data.message != "Failed") {
              Swal.fire(
                '',
                'Action effectuée avec success!',
                'success'
              );
              this.router.navigate(['/affectation/list']);
            }
            else {
              Swal.fire(
                '',
                'Affectation déjà existe !!',
                'error'
              );
            }
          },
          error => console.log(error));
      }
    }
  }

  Retour() {
    this.router.navigate(['/affectation/list']);
  }

  private updateAffectation(id: any) {
    // @ts-ignore
    let obj = {id: id, group_id: this.form.value.group_id,enseignant_id:this.form.value.enseignant_id,matiere_id:this.form.value.matiere_id}
    this.affectationService.updateAffectation(obj)
      .subscribe(data => {
        this.affectation = new Affectation();
        this.router.navigate(['/affectation/list']);
      }, error => console.log(error));
  }

}
