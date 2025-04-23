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
import {RegionComponent} from "./pages/region/region.component";
import {RegionAddComponent} from "./pages/region-add/region-add.component";
import { CustomerComponent } from './pages/customer/customer.component';
import { CustomerAddComponent } from './pages/customer-add/customer-add.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { EmployeeAddComponent } from './pages/employee-add/employee-add.component';
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
  // { path: 'matiere/add', component: AjouterMatieresComponent },
  // { path: 'matiere/update/:id', component: AjouterMatieresComponent},
  // { path: 'affectation/update/:id', component: AffectationEnseignantComponent},
  // { path: 'affectation/add', component: AffectationEnseignantComponent},
  // { path: 'affectation/list', component: ListAffectationEnseignantComponent},
  // { path: 'user/add', component: AjouterUtilisateurComponent},
  // { path: 'user/update/:id', component: AjouterUtilisateurComponent},
  // { path: 'cours/add', component: AjouterCoursComponent},
  // { path: 'cours/list', component: ListCoursComponent},
  // { path: 'cours/update/:id', component: AjouterCoursComponent},
  { path: 'login', component: LoginComponent },
  // { path: 'list_user', component: ListUtilisateurComponent },
  // { path: 'matiere/list', component: ListMatieresComponent },
  // { path: 'groupe/list', component: GroupListComponent },
  // { path: 'groupe/add', component: AjouterGroupComponent },
  // { path: 'groupe/update/:id', component: AjouterGroupComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'pages-error404', component: PagesError404Component },
  { path: 'user-profile', component: UsersProfileComponent },
  {path:'categorie',component:CategorieComponent},
  {path:'categorie/add',component:CategorieAddComponent},
  {path:'categorie/edit/:id',component:CategorieAddComponent},
  {path:'region',component:RegionComponent},
  {path:'region/add',component:RegionAddComponent},
  {path:'region/edit/:id',component:RegionAddComponent},
  {path:'customer',component:CustomerComponent},
  {path:'customer/add',component:CustomerAddComponent},
  {path:'customer/edit/:id',component:CustomerAddComponent},
  {path:'employee',component:EmployeeComponent},
  {path:'employee/add',component:EmployeeAddComponent},
  {path:'employee/edit/:id',component:EmployeeAddComponent},
  {path:'territorie',component:TerritorieComponent},
  {path:'territorie/add',component:TerritorieAddComponent},
  {path:'territorie/edit/:id',component:TerritorieAddComponent},
  {path:'empterritorie',component:EmpterritorieComponent},
  {path:'empterritorie/add',component:EmpterritorieAddComponent},
  {path:'empterritorie/edit/:id',component:EmpterritorieAddComponent},
  {path:'order',component:OrderComponent},
  {path:'order/add',component:OrderAddComponent},
  {path:'order/edit/:id',component:OrderAddComponent},
  {path:'supplier',component:SupplierComponent},
  {path:'supplier/add',component:SupplierAddComponent},
  {path:'supplier/edit/:id',component:SupplierAddComponent},
  {path:'product',component:ProductComponent},
  {path:'product/add',component:ProductAddComponent},
  {path:'product/edit/:id',component:ProductAddComponent},
  {path:'orderdetail',component:OrderdetailComponent},
  {path:'orderdetail/add',component:OrderdetailAddComponent},
  {path:'orderdetail/edit/:id',component:OrderdetailAddComponent},
  {path:'shipper',component:ShipperComponent},
  {path:'shipper/add',component:ShipperAddComponent},
  {path:'shipper/edit/:id',component:ShipperAddComponent},
  { path:'produitclient', component: ProductClientComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
