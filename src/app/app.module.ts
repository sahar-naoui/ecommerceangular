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
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
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
import { AuthInterceptor } from './auth.interceptor';
import {RegionComponent} from "./pages/region/region.component";
import { RegionAddComponent } from './pages/region-add/region-add.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerAddComponent } from './pages/customer-add/customer-add.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';
import { MatNativeDateModule } from '@angular/material/core';
import { TerritorieComponent } from './pages/territorie/territorie.component';
import { TerritorieAddComponent } from './pages/territorie-add/territorie-add.component';
import { EmpterritorieComponent } from './pages/empterritorie/empterritorie.component';
import { EmpterritorieAddComponent } from './pages/empterritorie-add/empterritorie-add.component';
import { OrderComponent } from './pages/order/order.component';
import { OrderAddComponent } from './pages/order-add/order-add.component';
import { SupplierComponent } from './pages/supplier/supplier.component';
import { SupplierAddComponent } from './pages/supplier-add/supplier-add.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { OrderdetailComponent } from './pages/orderdetail/orderdetail.component';
import { OrderdetailAddComponent } from './pages/orderdetail-add/orderdetail-add.component';
import { ShipperComponent } from './pages/shipper/shipper.component';
import { ShipperAddComponent } from './pages/shipper-add/shipper-add.component';
import {ProductClientComponent} from "./pages/product-client/product-client.component";

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
    CategorieAddComponent,
    RegionComponent,
    RegionAddComponent,
    CustomerComponent,
    CustomerAddComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    TerritorieComponent,
    TerritorieAddComponent,
    EmpterritorieComponent,
    EmpterritorieAddComponent,
    OrderComponent,
    OrderAddComponent,
    SupplierComponent,
    SupplierAddComponent,
    ProductComponent,
    ProductAddComponent,
    OrderdetailComponent,
    OrderdetailAddComponent,
    ShipperComponent,
    ShipperAddComponent,
    ProductClientComponent
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
        MatNativeDateModule,


    ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
