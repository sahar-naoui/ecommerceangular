import { Component, OnInit } from '@angular/core';
import {Group} from "../../models/Group";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AffectationService} from "../../_services/affectation.service";
import {CourService} from "../../_services/cour.service";
import {Affectation} from "../../models/Affectation";
import Swal from "sweetalert2";
import {Cour} from "../../models/Cour";
@Component({
  // template: '<form [formGroup]="form"><input formControlName="date" type="text"></form><p>Date : {{form.value.date}}</p>',
  selector: 'app-ajouter-cours',
  templateUrl: './ajouter-cours.component.html',
  styleUrls: ['./ajouter-cours.component.css']
})
export class AjouterCoursComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  // @ts-ignore
  groups: Observable<Group[]>;
  CurrentItemId: any;
  filename: any;
  image: any;
  cour: Cour = new Cour();
  constructor(private router: Router , private activatedRoute: ActivatedRoute,private affectationService:AffectationService, private  courService:CourService) { }

  ngOnInit(): void {
    const user_id=window.sessionStorage.getItem("id")
    // @ts-ignore
    this.groups = this.affectationService.getListGroupByEnseignant(user_id);
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Cour';
      this.buttonadd = 'Modifier ';
      this.courService.getCour(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.cour = data;
          this.initForm1(data);
        }, error => console.log(error));
    }else{
      this.CurrentItemId=0;
      console.log(this.CurrentItemId)
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Cour';
      this.form = new FormGroup({
        group_enseignant_matiere_id: new FormControl('', Validators.required),
        nb_copie: new FormControl('', Validators.required),
        file: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required)
      });
    }
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      group_enseignant_matiere_id: new FormControl(data.idAffectation, Validators.required),
      nb_copie: new FormControl(data.nbCopies, Validators.required),
      file: new FormControl(data.filename, Validators.required),
      date: new FormControl(data.dateTirage, Validators.required),
      filename: new FormControl(data.filename, Validators.required)
    });
    this.filename=data.filename;
    switch (data.filetype) {
      case 'application/pdf':
        this.image="assets/img/pdf.png"
        break;
      case 'image/jpeg':
        this.image="assets/img/jpg.png"
        break;
      case 'image/png':
        this.image="assets/img/png.png"
        break;
      case 'application/vnd.ms-excel':
        this.image="assets/img/xls.png"
        break;
      case 'text/csv':
        this.image="assets/img/csv.png"
        break;
      case 'text/plain':
        this.image="assets/img/txt.png"
        break;
      default:
        this.image="assets/img/doc.png"
    }
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
          this.updateCour( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }else{
      if(this.form.value.group_enseignant_matiere_id != '' && this.form.value.nb_copie !='' && this.form.value.file !='' && this.form.value.date !=''){
        const uploadData = new FormData();
        uploadData.append('dateTirage', this.form.value.date);
        uploadData.append('idAffectation', this.form.value.group_enseignant_matiere_id);
        uploadData.append('nbCopies',this.form.value.nb_copie);
        uploadData.append('file', this.selectedFile);
        this.courService.register(uploadData).subscribe(data => {
            this.cour = new Cour();
            // @ts-ignore
            if (data.message != "Failed") {
              Swal.fire(
                '',
                'Action effectuée avec success!',
                'success'
              );
              this.router.navigate(['/cours/list']);
            }
            else {
              Swal.fire(
                '',
                'Vérifier nombre de groupes !!',
                'error'
              );
            }
            // @ts-ignore
            if(data.status == 500){
              Swal.fire(
                '',
                'Taille de fichier est grand !!',
                'error'
              );
            }
          },
          error => console.log(error));
      }
    }
  }
  private updateCour(id: any) {
    const uploadData = new FormData();
    uploadData.append('dateTirage', this.form.value.date);
    uploadData.append('idAffectation', this.form.value.group_enseignant_matiere_id);
    uploadData.append('nbCopies',this.form.value.nb_copie);
    uploadData.append('file', this.selectedFile);
    uploadData.append('id', id);
    this.courService.updateCour(uploadData)
      .subscribe(data => {
        this.cour = new Cour();
        // @ts-ignore
        if (data.message != "Failed") {
          Swal.fire(
            '',
            'Action effectuée avec success!',
            'success'
          );
          this.router.navigate(['/cours/list']);
        }
        else {
          Swal.fire(
            '',
            'Vérifier nombre de groupes !!',
            'error'
          );
        }

      }, error => console.log(error));
  }

  Retour() {
    this.router.navigate(['/cours/list']);
  }
  // @ts-ignore
  selectedFile: File;
  onFileChange(event:any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  downloadCour(id: any) {
    this.courService.downloadCour(id).subscribe(
      data => {
      },
      error => console.log(error));
  }
}
