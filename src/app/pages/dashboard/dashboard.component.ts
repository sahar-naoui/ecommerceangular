import { Component, OnInit, ElementRef } from '@angular/core';
import {AuthService} from "../../_services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nbEnseignant:any
  constructor(private elementRef: ElementRef ,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getNbEnseignant().subscribe(
      data => {
        this.nbEnseignant=data
      },
      error => console.log(error));
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);
  }

}
