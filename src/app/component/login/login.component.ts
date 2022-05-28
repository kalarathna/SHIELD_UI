import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import{LoginModel} from 'src/app/model/loginModel';
import { DataService } from 'src/app/service/data.service';
import {HttpErrorResponse} from '@angular/common/http';
// interface IUser {
//   userName: string;
//   lastname: string;
//   email: string;
//   password: string;
//   showPassword: boolean;
// }
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginErrFlag: String;
  loginErrDesc: String;
  reactiveForm!: FormGroup;
  httpErrorResp = false;
  logoutFlag:any;
  setQrImageUrl:any;
  // user: IUser;
  loginmodel: LoginModel= new LoginModel();

  public loggedIn:false;
  constructor(private router: Router, private dataservice:DataService) {
    // this.user = {} as IUser;
  }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
      userName: new FormControl(this.loginmodel.userName, [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl(this.loginmodel.password, [
        Validators.required,
        Validators.minLength(3),
      ]),
      // showPassword: new FormControl(this.loginmodel.showPassword),
    });
  }

  get userName() {
    return this.reactiveForm.get('userName')!;
  }
  get password() {
    return this.reactiveForm.get('password')!;
  }

  public login(): void {

     if (this.reactiveForm.invalid) {

      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    else{
      this.loginmodel = this.reactiveForm.value;
      this.dataservice.login(this.loginmodel).subscribe(response =>{
        if (!response.errorFlg) {
          this.setQrImageUrl=response.secretImageURI;
          // sessionStorage.setItem('firstName',response.firstName);
          // sessionStorage.setItem('userUuid',response.uuid);
          // sessionStorage.setItem('token',response.token);
          // sessionStorage.setItem('userName',response.userName);
          // this.logoutFlag=true;
          this.router.navigate(['qrcode',this.setQrImageUrl]);
        }
        else{
          this.loginErrFlag = response.errorFlg;
          this.loginErrDesc = 'Invalid Credentails Try again';
          this.router.navigate(['/login']);
        }

      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/login']);
        this.httpErrorResp = true;
      }
      )

    }
    console.info('userName:', this.loginmodel.userName);
    //console.info('Password:', this.loginmodel.password);
  }
}
