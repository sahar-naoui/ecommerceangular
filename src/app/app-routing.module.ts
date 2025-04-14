import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import {LoginComponent} from "./pages/login/login.component";
import {ListUtilisateurComponent} from "./pages/list-utilisateur/list-utilisateur.component";
import {ListMatieresComponent} from "./pages/list-matieres/list-matieres.component";
import {AjouterMatieresComponent} from "./pages/ajouter-matieres/ajouter-matieres.component";
import {GroupListComponent} from "./pages/group-list/group-list.component";
import {AjouterGroupComponent} from "./pages/ajouter-group/ajouter-group.component";
import {AffectationEnseignantComponent} from "./pages/affectation-enseignant/affectation-enseignant.component";
import { ListAffectationEnseignantComponent} from "./pages/list-affectation-enseignant/list-affectation-enseignant.component";
import {AjouterUtilisateurComponent} from "./pages/ajouter-utilisateur/ajouter-utilisateur.component";
import {AjouterCoursComponent} from "./pages/ajouter-cours/ajouter-cours.component";
import {ListCoursComponent} from "./pages/list-cours/list-cours.component";
import {PagesError404Component} from "./pages/pages-error404/pages-error404.component";
import {CategorieComponent} from "./pages/categorie/categorie.component";
import {CategorieAddComponent} from "./pages/categorie-add/categorie-add.component";
const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: PagesRegisterComponent
      }
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'matiere/add', component: AjouterMatieresComponent },
  { path: 'matiere/update/:id', component: AjouterMatieresComponent},
  { path: 'affectation/update/:id', component: AffectationEnseignantComponent},
  { path: 'affectation/add', component: AffectationEnseignantComponent},
  { path: 'affectation/list', component: ListAffectationEnseignantComponent},
  { path: 'user/add', component: AjouterUtilisateurComponent},
  { path: 'user/update/:id', component: AjouterUtilisateurComponent},
  { path: 'cours/add', component: AjouterCoursComponent},
  { path: 'cours/list', component: ListCoursComponent},
  { path: 'cours/update/:id', component: AjouterCoursComponent},
  { path: 'login', component: LoginComponent },
  { path: 'list_user', component: ListUtilisateurComponent },
  { path: 'matiere/list', component: ListMatieresComponent },
  { path: 'groupe/list', component: GroupListComponent },
  { path: 'groupe/add', component: AjouterGroupComponent },
  { path: 'groupe/update/:id', component: AjouterGroupComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'user-profile', component: UsersProfileComponent },
  {path:'categorie',component:CategorieComponent},
  {path:'categorie/add',component:CategorieAddComponent},
  {path:'categorie/edit/:id',component:CategorieAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
