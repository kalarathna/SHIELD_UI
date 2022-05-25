import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {SignUpModel} from 'src/app/model/signUpModel';
import {Router} from "@angular/router";
import { DataService } from 'src/app/service/data.service';
import {HttpErrorResponse} from '@angular/common/http';

// interface IUser {
//   name: string;
//   lastname: string;
//   email: string;
//   password: string;
//   organisation:string;
//   showPassword: boolean;
// }
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpErrFlag: String;
  signUpErrDesc: String;
  httpErrorResp = false;
  reactiveForm!: FormGroup;
  setQrImageUrl:any;
  //user: IUser;
  logoutFlag:any;
  signupModel: SignUpModel  = new SignUpModel();

  constructor(private router: Router, private dataservice:DataService) {

  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      firstName: new FormControl(this.signupModel.firstName, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      lastName: new FormControl(this.signupModel.lastName, [
        Validators.maxLength(10),
      ]),
      organisationName: new FormControl(this.signupModel.organisationName, [
        Validators.maxLength(250),
      ]),
      email: new FormControl(this.signupModel.email, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(250),
      ]),
      password: new FormControl(this.signupModel.password, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  get firstName() {
    return this.reactiveForm.get('firstName')!;
  }

  get lastName() {
    return this.reactiveForm.get('lastName')!;
  }

  get email() {
    return this.reactiveForm.get('email')!;
  }

  get organisationName(){
    return this.reactiveForm.get('organisationName');
  }

  get password() {
    return this.reactiveForm.get('password')!;
  }

  public register(): void {
    this.signupModel.enableMFA=true;
    this.signupModel = this.reactiveForm.value;
    console.log(this.signupModel);
    if (this.reactiveForm.invalid) {
      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    else{

      this.dataservice.registerNewUser(this.signupModel).subscribe(response =>{
        if (!response.errorFlg) {
          this.setQrImageUrl=response.secretImageURI;
          sessionStorage.setItem('firstName',response.firstName);
          sessionStorage.setItem('userUuid',response.uuid);
          sessionStorage.setItem('token',response.token);
          this.logoutFlag=true;
          console.log(this.router.navigate(['qrcode',this.setQrImageUrl]));
          this.router.navigate(['qrcode',this.setQrImageUrl]);
        }
        else{
            this.signUpErrFlag = response.errorFlg;
            this.signUpErrDesc = 'Please try again later.';

        }
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['login']);
        this.httpErrorResp = true;
      }
      )
    }


  }
}

