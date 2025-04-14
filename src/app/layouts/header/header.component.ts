import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  UserName:any
  role:any
  ngOnInit(): void {
    this.UserName = window.sessionStorage.getItem("username")
    this.UserName = this.UserName.replace(/"/g, '');
    this.role = window.sessionStorage.getItem("role")
    this.role = this.role.replace(/"/g, '');
  }
  sidebarToggle()
  {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }
}
