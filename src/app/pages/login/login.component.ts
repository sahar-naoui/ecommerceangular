import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth.service";
import {StorageService} from "../../_services/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService , private router:Router) { }

  ngOnInit(): void {
    this.storageService.clean()
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data.Data);
        window.sessionStorage.setItem("token", JSON.stringify(data.Data.accessToken.Token));
        window.sessionStorage.setItem("id", JSON.stringify(data.Data.User.email));
        window.sessionStorage.setItem("role", JSON.stringify(data.Data.UserRoles[0]));
        window.sessionStorage.setItem("email", JSON.stringify(data.Data.User.email));
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.router.navigate(['/dashboard'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
