import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../_services/auth.service";
import {Group} from "../../models/Group";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit {
  form: any ;
  constructor(private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name : new FormControl(null , [Validators.required]),
      email : new FormControl(null , [Validators.required]),
      password : new FormControl(null , [Validators.required]),
      password_confirmation : new FormControl(null , [Validators.required]),
    });
  }

  onSub() {
    console.log(this.form.value);
    this.authService.register(this.form.value).subscribe((res)=>{
      switch (res.Message){
        case "The email has already been taken.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email has already been taken.",

          });
          break;
        case "The email has already been taken.,The password confirmation does not match.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email has already been taken.,The password confirmation does not match.",

          });
          break;
        case "The password must be at least 6 characters.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The password must be at least 6 characters.",

          });
          break
        case "The email must be a valid email address.,The password confirmation does not match.,The password must be at least 6 characters.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email must be a valid email address.,The password confirmation does not match.,The password must be at least 6 characters.",

          });
          break;
        case "The email has already been taken.,The password must be at least 6 characters.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email has already been taken.,The password must be at least 6 characters.",

          });
          break;
        case "The password confirmation does not match.,The password must be at least 6 characters.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The password confirmation does not match.,The password must be at least 6 characters.",

          });
          break;
        case "The name must be between 2 and 100 characters.,The password confirmation does not match.":
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The name must be between 2 and 100 characters.,The password confirmation does not match.",

          });
          break;
      }
      // @ts-ignore
      if(res.Success == true) {
        this.router.navigate(['/login'])
      }
      },
      error => console.log(error));
  }

}
