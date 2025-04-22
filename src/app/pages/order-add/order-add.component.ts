import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { Order } from 'src/app/models/Order';
import { Customer } from 'src/app/models/Customer';
import { Employee } from 'src/app/models/Employee';
import { OrderService } from 'src/app/_services/order.service';
import { CustomerService } from 'src/app/_services/customer.service';
import { EmployeeService } from 'src/app/_services/employee.service';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  form: any ;
  title: any;
  buttonadd: any;
  order: Order = new Order();
  // @ts-ignore
  customers: Observable<Customer[]>;
  // @ts-ignore
  employees: Observable<Employee[]>;
  private CurrentItemId: any;
  constructor(private orderService: OrderService,private router: Router, private activatedRoute: ActivatedRoute,
     private customerService: CustomerService, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.customerService.getListCustomer().subscribe(data => {
      this.customers = data.Data; 
    });
    this.employeeService.getListEmployee().subscribe(data => {
      this.employees = data.Data; 
    });
    // @ts-ignore
    this.CurrentItemId = this.activatedRoute.snapshot.params.id;
    if (!!this.CurrentItemId) {
      this.title = 'Modifier Order';
      this.buttonadd = 'Modifier ';
      // @ts-ignore
      this.orderService.getOrder(this.CurrentItemId)
        .subscribe(data => {
          // @ts-ignore
          this.compte = data;
          this.initForm1(data.Data);
        }, error => console.log(error));
    }else{
      this.buttonadd = 'Enregistrer ';
      this.title = 'Ajouter Order';
      this.initForm();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      CustomerID : new FormControl(null , [Validators.required]),
      EmployeeID : new FormControl(null , [Validators.required]),
      OrderDate : new FormControl(null , [Validators.required]),
      RequiredDate : new FormControl(null , [Validators.required]),
      ShippedDate : new FormControl(null , [Validators.required]),
      ShipVia : new FormControl(null , [Validators.required]),
      Freight : new FormControl(null , [Validators.required]),
      ShipName : new FormControl(null , [Validators.required]),
      ShipAddress : new FormControl(null , [Validators.required]),
      ShipCity : new FormControl(null , [Validators.required]),
      ShipRegion : new FormControl(null , [Validators.required]),
      ShipPostalCode : new FormControl(null , [Validators.required]),
      ShipCountry : new FormControl(null , [Validators.required]),
    });
  }
  private initForm1(data: any) {
    this.form = new FormGroup({
      CustomerID : new FormControl(data.CustomerID , [Validators.required]),
      EmployeeID : new FormControl(data.EmployeeID , [Validators.required]),
      OrderDate : new FormControl(data.OrderDate , [Validators.required]),
      RequiredDate : new FormControl(data.RequiredDate , [Validators.required]),
      ShippedDate : new FormControl(data.ShippedDate , [Validators.required]),
      ShipVia : new FormControl(data.ShipVia , [Validators.required]),
      Freight : new FormControl(data.Freight , [Validators.required]),
      ShipName : new FormControl(data.ShipName , [Validators.required]),
      ShipAddress : new FormControl(data.ShipAddress , [Validators.required]),
      ShipCity : new FormControl(data.ShipCity , [Validators.required]),
      ShipRegion : new FormControl(data.ShipRegion , [Validators.required]),
      ShipPostalCode : new FormControl(data.ShipPostalCode , [Validators.required]),
      ShipCountry : new FormControl(data.ShipCountry , [Validators.required]),
    });
  }
  Retour() {
    this.router.navigate(['/order']);
  }
  formatDateForMySQL(dateString: string): string {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    const hh = ('0' + date.getHours()).slice(-2);
    const min = ('0' + date.getMinutes()).slice(-2);
    const ss = ('0' + date.getSeconds()).slice(-2);
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  }
  
  onSub() {
    const formattedOrder = {
      ...this.form.value,
      OrderDate: this.formatDateForMySQL(this.form.value.OrderDate),
      RequiredDate: this.formatDateForMySQL(this.form.value.RequiredDate),
      ShippedDate: this.formatDateForMySQL(this.form.value.ShippedDate),
    };
  
    this.orderService.register(formattedOrder).subscribe(
      data => {
        this.order = new Order();
        Swal.fire('', 'Action effectuée avec succès!', 'success');
        this.router.navigate(['/order']);
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
  
  private updateOrder(id: any) {
    // console.log(this.form.value);
    // @ts-ignore
    let obj = {id: id, CustomerID: this.form.value.CustomerID,EmployeeID:this.form.value.EmployeeID,
      OrderDate:this.form.value.OrderDate, RequiredDate: this.form.value.RequiredDate,
      ShippedDate:this.form.value.ShippedDate,ShipVia:this.form.value.ShipVia,
      Freight:this.form.value.Freight,ShipName:this.form.value.ShipName,
      ShipAddress: this.form.value.ShipAddress,ShipCity:this.form.value.ShipCity,
      ShipPostalCode:this.form.value.ShipPostalCode,ShipCountry:this.form.value.ShipCountry}
    this.orderService.updateOrder(obj,id)
      .subscribe(data => {
        this.order = new Order();
        this.router.navigate(['/order']);
      }, error => console.log(error));
  }
}
