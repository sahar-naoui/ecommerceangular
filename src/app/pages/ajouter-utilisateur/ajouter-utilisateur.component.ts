import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Role} from "../../models/Role";
import {AuthService} from "../../_services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import {User} from "../../models/User";
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.css']
})
export class AjouterUtilisateurComponent implements OnInit {
  form: any;
  title: any;
  buttonadd: any;
  // @ts-ignore
  roles: Observable<Role[]>;
  private CurrentItemId: any;
  user: User = new User();
  constructor(private authService: AuthService,private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.roles = this.authService.getListRole();
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Utilisateur';
      this.buttonadd = 'Modifier ';
      this.authService.getUser(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.user = data;
          this.initForm1(data);
        }, error => console.log(error));
    }else {
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Utilisateur';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  private initForm1(data: any) {
    // @ts-ignore
    // let decoded = jwt_decode(data.password);
    this.form = new FormGroup({
      role : new FormControl(data.roles[0].name , [Validators.required]),
      username: new FormControl(data.username, [Validators.required]),
      email: new FormControl(data.email, [Validators.required]),
      password: new FormControl(null , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/user/list']);
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
        denyButtonText: `Annuler`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.updateUser( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }else {
      if(this.form.value.role != null && this.form.value.username!=null && this.form.value.email!=null && this.form.value.password!=null) {
        let obj = {username: this.form.value.username,email:this.form.value.email,password:this.form.value.password,role:[this.form.value.role]}
        this.authService.register(obj).subscribe(data => {
            this.user = new User();
            Swal.fire(
              '',
              'Action effectuée avec success!',
              'success'
            );
            this.router.navigate(['/list_user']);
          },
          error => console.log(error));
      }
    }
  }
  private updateUser(id: any) {
    // @ts-ignore
    let obj = {id:id,username: this.form.value.username,email:this.form.value.email,password:this.form.value.password}
    this.authService.updateUser(obj)
      .subscribe(data => {
        this.user = new User();
        this.router.navigate(['/list_user']);
      }, error => console.log(error));
  }
}
