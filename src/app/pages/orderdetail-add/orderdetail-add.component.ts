  import { Component, OnInit } from '@angular/core';
  import {ActivatedRoute, Router} from "@angular/router";
  import {FormControl, FormGroup, Validators} from "@angular/forms";
  import Swal from "sweetalert2";
  import { OrderDetail } from 'src/app/models/Orderdetail';
  import { OrderdetailService } from 'src/app/_services/orderdetail.service';
  import { Order } from 'src/app/models/Order';
  import { Product } from 'src/app/models/Product';
  import { OrderService } from 'src/app/_services/order.service';
  import { ProductService } from 'src/app/_services/product.service';
  @Component({
    selector: 'app-orderdetail-add',
    templateUrl: './orderdetail-add.component.html',
    styleUrls: ['./orderdetail-add.component.css']
  })
  export class OrderdetailAddComponent implements OnInit {
    form: any ;
    title: any;
    buttonadd: any;
    orderdetail: OrderDetail = new OrderDetail();
      // @ts-ignore
    orders: Observable<Order[]>;
    // @ts-ignore
    products: Observable<Product[]>;
    private CurrentItemId: any;
    constructor(private orderdetailservice: OrderdetailService,private orderService: OrderService,
      private productService: ProductService,private router: Router , private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      this.productService.getListProduct().subscribe(data => {
        this.products = data.Data; 
      });
      this.orderService.getListOrder().subscribe(data => {
        this.orders = data.Data; 
      });
      // @ts-ignore
      this.CurrentItemId = this.activatedRoute.snapshot.params.id;
      if (!!this.CurrentItemId) {
        this.title = 'Modifier Détail ordre';
        this.buttonadd = 'Modifier ';
        // @ts-ignore
        this.orderdetailservice.getOrderdetail(this.CurrentItemId)
          .subscribe(data => {
            // @ts-ignore
            this.compte = data;
            this.initForm1(data.Data);
          }, error => console.log(error));
      }else{
        this.buttonadd = 'Enregistrer ';
        this.title = 'Ajouter Détail ordre';
        this.initForm();
      }
    }
    private initForm() {
      this.form = new FormGroup({
        OrderID : new FormControl(null , [Validators.required]),
        ProductID : new FormControl(null , [Validators.required]),
        UnitPrice : new FormControl(null , [Validators.required]),
        Quantity : new FormControl(null , [Validators.required]),
        Discount : new FormControl(null , [Validators.required]),
      });
    }
    private initForm1(data: any) {
      this.form = new FormGroup({
        OrderID : new FormControl(data.OrderID , [Validators.required]),
        ProductID : new FormControl(data.ProductID , [Validators.required]),
        UnitPrice : new FormControl(data.UnitPrice , [Validators.required]),
        Quantity : new FormControl(data.Quantity , [Validators.required]),
        Discount : new FormControl(data.Discount , [Validators.required]),
      });
    }
    Retour() {
      this.router.navigate(['/orderdetail']);
    }

    onSub() {
      console.log("Valeurs envoyées :", this.form.value);
    
      if (!!this.CurrentItemId) {
        // On est en mode modification
        this.updateOrderdetail(this.CurrentItemId);
      } else {
        // Mode ajout
        this.orderdetailservice.register(this.form.value).subscribe(
          data => {
            this.orderdetail = new OrderDetail();
            Swal.fire('', 'Action effectuée avec succès!', 'success');
            this.router.navigate(['/orderdetail']);
          },
          error => {
            console.error(error);
            const backendMessage = error.error?.message || '';
    
            Swal.fire({
              icon: 'error',
              title: 'Erreur',
              text: backendMessage || 'Erreur interne du serveur',
              footer: 'Code erreur : ' + error.status
            });
          }
        );
      }
    }
    
    private updateOrderdetail(id: any) {
      let obj = {
        id: id,
        OrderID: this.form.value.OrderID,
        ProductID: this.form.value.ProductID,
        UnitPrice: this.form.value.UnitPrice,
        Quantity: this.form.value.Quantity,
        Discount: this.form.value.Discount
      };
    
      this.orderdetailservice.updateOrderdetail(obj, id)
        .subscribe(data => {
          Swal.fire('', 'Mise à jour effectuée avec succès!', 'success');
          this.router.navigate(['/orderdetail']);
        }, error => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Erreur lors de la mise à jour.',
            footer: 'Code erreur : ' + error.status
          });
        });
    }
    
  }
