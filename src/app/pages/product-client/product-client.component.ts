import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_services/product.service';
import { Product } from 'src/app/models/Product';
import { Categorie } from 'src/app/models/Categorie';
import {CategorieService} from "../../_services/categorie.service";

@Component({
  selector: 'app-product-client',
  templateUrl: './product-client.component.html',
  styleUrls: ['./product-client.component.css']
})
export class ProductClientComponent implements OnInit {

  products: Product[] = [];
  allProducts: Product[] = [];

  categories: Categorie[] = [];
  selectedCategoryId: string = ''; // ID sélectionné

  constructor(
    private productService: ProductService,
    private categoryService: CategorieService,
  ) {}

  ngOnInit(): void {
    // Charger les produits
    this.productService.getListProduct().subscribe(res => {
      this.allProducts = res.Data;
      this.products = [...this.allProducts];
    });

    // Charger les catégories
    this.categoryService.getListCategorie().subscribe(res => {
      this.categories = res.Data;
    });
  }

  filterByCategory(): void {
    if (!this.selectedCategoryId) {
      this.products = [...this.allProducts];
    } else {
      const categoryId = BigInt(this.selectedCategoryId);
      this.products = this.allProducts.filter(p => BigInt(p.CategoryID) === categoryId);

    }
  }
}
