import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-passwordnotifictaion',
  templateUrl: './passwordnotifictaion.component.html',
  styleUrls: ['./passwordnotifictaion.component.scss']
})
export class PasswordnotifictaionComponent implements OnInit {

  public  creationDate:Date;
  public appName: string;
  reactiveForm!: FormGroup;
  passwordErrFlag: String;
  passwordErrDesc="Please try again later";
  httpErrorResp = false;
  contentArray: Array<any> = new Array();
  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(this.appName, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(this.creationDate, [
        Validators.required,
      ]),
      // showPassword: new FormControl(this.loginmodel.showPassword),
    });
  }

  get applicationName() {
    return this.reactiveForm.get('appName')!;
  }
  get createdDate() {
    return this.reactiveForm.get('creationDate')!;
  }

  save(){

  }

}
