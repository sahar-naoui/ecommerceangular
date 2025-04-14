import { Component, OnInit } from '@angular/core';
import {JwtClientService} from "../jwt-client.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest:any={
    "UserName=":"Majdi",
    "password":"30052021"
  }
  constructor( private  service:JwtClientService) { }

  ngOnInit(): void {
    this.getAcessToken(this.authRequest)
  }
public  getAcessToken(authRequest:any)
{
let resp=this.service.genrateToken(authRequest);
  resp.subscribe(data=>console.log("Token:"+data));
}
}
