import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersProfileComponent } from './pages/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/pages-blank/pages-blank.component';
import { SecurityComponent } from './security/security.component';
import {HttpClientModule} from "@angular/common/http";
import {httpInterceptorProviders} from "./_helpers/http.interceptor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './pages/login/login.component';
import { ListUtilisateurComponent } from './pages/list-utilisateur/list-utilisateur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ListMatieresComponent } from './pages/list-matieres/list-matieres.component';
import { AjouterMatieresComponent } from './pages/ajouter-matieres/ajouter-matieres.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import {MatIconModule} from "@angular/material/icon";
import {GroupListComponent} from "./pages/group-list/group-list.component";
import { AjouterGroupComponent } from './pages/ajouter-group/ajouter-group.component';
import { AffectationEnseignantComponent } from './pages/affectation-enseignant/affectation-enseignant.component';
import { ListAffectationEnseignantComponent } from './pages/list-affectation-enseignant/list-affectation-enseignant.component';
import {MatSelectModule} from "@angular/material/select";
import { AjouterUtilisateurComponent } from './pages/ajouter-utilisateur/ajouter-utilisateur.component';
import { MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ListCoursComponent } from './pages/list-cours/list-cours.component';
import { AjouterCoursComponent } from './pages/ajouter-cours/ajouter-cours.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CategorieComponent} from "./pages/categorie/categorie.component";
import { CategorieAddComponent } from './pages/categorie-add/categorie-add.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesError404Component,
    PagesBlankComponent,
    SecurityComponent,
    LoginComponent,
    ListUtilisateurComponent,
    ListMatieresComponent,
    AjouterMatieresComponent,
    GroupListComponent,
    AjouterGroupComponent,
    AffectationEnseignantComponent,
    ListAffectationEnseignantComponent,
    AjouterUtilisateurComponent,
    ListCoursComponent,
    AjouterCoursComponent,
    CategorieComponent,
    CategorieAddComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatSortModule,
        MatIconModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSlideToggleModule,
        MatDatepickerModule,


    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
