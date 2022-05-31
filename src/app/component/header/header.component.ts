import { Component, OnInit } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'is-what';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   loggedIn=false;
   firstName:string|null;
  constructor(private router:Router) {
  }


  ngOnInit(): void {
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      this.loggedIn = true;
      if (!isNullOrUndefined(sessionStorage.getItem('firstName'))) {
        this.firstName = sessionStorage.getItem('firstName');

      }
    }
  }

  logOut():void{
    window.sessionStorage.clear();
    this.loggedIn=false;
    this.router.navigate(['login'])
  }
}
