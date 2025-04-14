import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  role:any
  enseignant:any
  constructor() { }

  ngOnInit(): void {
     this.role = window.sessionStorage.getItem("role")
     this.role = this.role.replace(/"/g, '');
    this.enseignant="ROLE_ENSEIGNANT"
    console.log(this.role);
  }

}
