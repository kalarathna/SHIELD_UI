import { Component, OnInit } from '@angular/core';
import { isUndefined, isNullOrUndefined } from 'is-what';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   loggedIn=false;
   firstName:string|null;
  constructor() { if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
    this.loggedIn = true;
    if (!isNullOrUndefined(sessionStorage.getItem('firstName'))) {
      this.firstName = sessionStorage.getItem('firstName');
    }
  }}


  ngOnInit(): void {
  }

  logOut():void{
    window.sessionStorage.clear();
  }
}
