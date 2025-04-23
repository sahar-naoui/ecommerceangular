import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/_services/product.service';
import { Supplier } from 'src/app/models/Supplier';
import { Categorie } from 'src/app/models/Categorie';
import { CategorieService } from 'src/app/_services/categorie.service';
import { SupplierService } from 'src/app/_services/supplier.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  form: any ;
  title: any;
  buttonadd: any;
  product: Product = new Product();
    // @ts-ignore
  suppliers: Supplier[] = [];
  categories: Categorie[] = [];

  private CurrentItemId: any;
  constructor(private productService: ProductService,private router: Router , private activatedRoute: ActivatedRoute,
    private categorieService: CategorieService, private supplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.supplierService.getListSupplier().subscribe(data => {
      this.suppliers = data.Data;
    });
    this.categorieService.getListCategorie().subscribe(data => {
      this.categories = data.Data;
    });
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Produit';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.productService.getProduct(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Produit';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      ProductName: new FormControl(null, [Validators.required]),
      SupplierID: new FormControl(null, [Validators.required]),
      CategoryID: new FormControl(null, [Validators.required]),
      QuantityPerUnit: new FormControl(null, [Validators.required]),
      UnitPrice: new FormControl(null, [Validators.required]),
      UnitsInStock: new FormControl(null, [Validators.required]),
      UnitsOnOrder: new FormControl(null, [Validators.required]),
      ReorderLevel: new FormControl(null, [Validators.required]),
      Discontinued: new FormControl(false),
      ImageUrl: new FormControl(null),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      ProductName: new FormControl(data.ProductName, [Validators.required]),
      SupplierID: new FormControl(data.SupplierID, [Validators.required]),
      CategoryID: new FormControl(data.CategoryID, [Validators.required]),
      QuantityPerUnit: new FormControl(data.QuantityPerUnit, [Validators.required]),
      UnitPrice: new FormControl(data.UnitPrice, [Validators.required]),
      UnitsInStock: new FormControl(data.UnitsInStock, [Validators.required]),
      UnitsOnOrder: new FormControl(data.UnitsOnOrder, [Validators.required]),
      ReorderLevel: new FormControl(data.ReorderLevel, [Validators.required]),
      Discontinued: new FormControl(data.Discontinued ?? false),
      ImageUrl: new FormControl(data.ImageUrl),
    });
  }
  Retour() {
    this.router.navigate(['/product']);
  }
  onSub() {
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      // @ts-ignore
      Swal.fire({
        title: 'Voulez-vous enregistrer les modifications?',
        showCancelButton: true,
        confirmButtonText: 'Enregistrer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.updateProduct( this.CurrentItemId);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    }
    else{
      if(this.form.value.ProductName != null &&
        this.form.value.SupplierID != null &&
        this.form.value.CategoryID != null &&
        this.form.value.QuantityPerUnit != null &&
        this.form.value.UnitPrice != null &&
        this.form.value.UnitsInStock != null &&
        this.form.value.UnitsOnOrder != null &&
        this.form.value.ReorderLevel != null) {
          this.productService.register(this.form.value).subscribe(
            data => {
              console.log('Réponse backend:', data);
              this.product = new Product();
              Swal.fire('', 'Action effectuée avec succès!', 'success');
              this.router.navigate(['/product']);
            },
            error => console.log('Erreur lors de l’enregistrement:', error)
          );

      }
    }
  }
  private updateProduct(id: any) {
    console.log(this.form.value);
    // @ts-ignore
    let obj: any = {
      ProductName: this.form.value.ProductName,
      SupplierID: this.form.value.SupplierID,
      CategoryID: this.form.value.CategoryID,
      QuantityPerUnit: this.form.value.QuantityPerUnit,
      UnitPrice: this.form.value.UnitPrice,
      UnitsInStock: this.form.value.UnitsInStock,
      UnitsOnOrder: this.form.value.UnitsOnOrder,
      ReorderLevel: this.form.value.ReorderLevel,
      Discontinued: this.form.value.Discontinued,
      ImageUrl: this.form.value.ImageUrl
    };
    this.productService.updateProduct(obj,id)
      .subscribe(data => {
        this.product = new Product();
        this.router.navigate(['/product']);
      }, error => console.log(error));
  }

}
