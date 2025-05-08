import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Territorie } from 'src/app/models/Territorie';
import { TerritorieService } from 'src/app/_services/territorie.service';
import { RegionService } from 'src/app/_services/region.service';
import { Region } from 'src/app/models/Region';
@Component({
  selector: 'app-territorie-add',
  templateUrl: './territorie-add.component.html',
  styleUrls: ['./territorie-add.component.css']
})
export class TerritorieAddComponent implements OnInit {
 form: any ;
  title: any;
  buttonadd: any;
  territorie: Territorie = new Territorie();
    // @ts-ignore
  regions: Observable<Region[]>;
  private CurrentItemId: any;
  constructor(private territorieService: TerritorieService,private router: Router , private activatedRoute: ActivatedRoute,  private regionService: RegionService) { }

  ngOnInit(): void {
    this.regionService.getListRegion().subscribe(data => {
      this.regions = data.Data; 
    });
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Territorie';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.territorieService.getTerritorie(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Territorie';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      TerritoryID : new FormControl(null , [Validators.required]),
      TerritoryDescription : new FormControl(null , [Validators.required]),
      RegionID : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      TerritoryID : new FormControl(data.TerritoryID , [Validators.required]),
      TerritoryDescription : new FormControl(data.TerritoryDescription , [Validators.required]),
      RegionID : new FormControl(data.RegionID , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/territorie']);
  }

  onSub() {
    if (this.CurrentItemId) {
      this.updateTerritorie(this.CurrentItemId);
    } else {
      this.territorieService.register(this.form.value).subscribe(
        data => {
          this.territorie = new Territorie();
          Swal.fire('', 'Ajout effectué avec succès!', 'success');
          this.router.navigate(['/territorie']);
        },
        error => {
          console.error(error);
          const backendMessage = error.error?.message || '';
          if (backendMessage.includes('SQLSTATE[23000]')) {
            Swal.fire({
              icon: 'error',
              title: 'Territory ID existant',
              text: 'Veuillez choisir un autre Territory ID car il existe déjà.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: backendMessage || 'Erreur interne du serveur',
              footer: 'Code erreur : ' + error.status
            });
          }
        }
      );
    }
  }
    
  private updateTerritorie(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, TerritoryID: this.form.value.TerritoryID,TerritoryDescription:this.form.value.TerritoryDescription,
      RegionID:this.form.value.RegionID}
    this.territorieService.updateTerritorie(obj,id)
      .subscribe(data => {
        this.territorie = new Territorie();
        this.router.navigate(['/territorie']);
      }, error => console.log(error));
  }
}
