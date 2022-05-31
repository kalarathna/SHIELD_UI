import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { isUndefined, isNullOrUndefined } from 'is-what';
import { DataService } from 'src/app/service/data.service';
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {OtpModel} from "../../model/otpModel";

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})

export class QrcodeComponent implements OnInit {

 // setQrImageUrl='';
  reactiveForm!: FormGroup;
 setQrImageUrl:SafeResourceUrl;
  displayQrCode:any;
  httpErrorResp = false;
  otpModel: OtpModel= new OtpModel();
  imageString:any;
  // otpCode:string;
  otpErrFlag=false;
  status:string;
  logoutFlag=false;
  otpErrDesc="Invalid OTP, Please try again";

  //hasparam=false;
  constructor(private router: Router, private route: ActivatedRoute,  private dataservice:DataService, private sanitizer:DomSanitizer ) {
   this.imageString=this.route.snapshot.params['setQrImageUrl'];
  // console.log(this.imageString);
    //this.setQrImageUrl=this.sanitizer.bypassSecurityTrustUrl('data:image/PNG;base64,' + this.imageString);

  }




  authenticateOtp(){

    console.log(this.otpModel.otpCode);
    if (this.reactiveForm.invalid) {

      for (const control of Object.keys(this.reactiveForm.controls)) {
        this.reactiveForm.controls[control].markAsTouched();
      }
      return;
    }
    else {
      this.otpModel = this.reactiveForm.value;
      if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
        const userName = sessionStorage.getItem('userName');
        this.otpModel.userName=userName;
        console.log("inside qr component " + userName);
        this.dataservice.authenticateOtp(this.otpModel).subscribe(response => {
            if (!response.errorFlg) {
              console.log(response);
              sessionStorage.setItem('firstName', response.firstName);
              sessionStorage.setItem('userUuid', response.uuid);
              sessionStorage.setItem('token', response.token);
              sessionStorage.setItem('userName', response.userName);
              this.logoutFlag = true;
              this.router.navigate(['/home',this.logoutFlag]);
            } else {
              this.otpErrFlag = true;
              this.router.navigate(['/login']);
            }
          },
          (err: HttpErrorResponse) => {
            this.router.navigate(['/login']);
            this.httpErrorResp = true;
          })
      }
    }

  }

  ngOnInit() :void{

    console.log("qr code");
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      const userName= sessionStorage.getItem('userName');
    }
      this.reactiveForm = new FormGroup({
        otpCode: new FormControl(this.otpModel.otpCode, [
        Validators.required,
        Validators.maxLength(6),
      ]),
    });

  }
  get otpCode() {
    return this.reactiveForm.get('otpCode')!;
  }
}
