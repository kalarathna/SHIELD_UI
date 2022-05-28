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
  imageString:string;
  // otpCode:string;
  otpErrFlag=false;
  status:string;
  logoutFlag=false;
  otpErrDesc="Invalid OTP, Please try again";

  hasparam=false;
  constructor(private router: Router, private route: ActivatedRoute,  private dataservice:DataService, private sanitizer:DomSanitizer ) {
   // this.str="iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAADKElEQVR4Xu2ZO5bqMBBExSGYcJbAUliaWRpLYQmEBBz69a02WMaaX/yqA2SkKwdNqT+ixe/t3t5nvjHDvRnuzXBvhnv7P+BHk8X9Iy7Hk+bPbRdxPcSp7W9a3BsewjzFiSHhXPm8sP5xPZynx/72+UQMD+D05fH0aPLz7t5Y3kVS5yn9zFbD38L5dM1BVDC0lGiE4Z/hGgLPAt8/rqlTwz/A+aHTnX5Gm+wJ4COBEcEa/gJusgcHWe5eD1o0PIRne5BFMgE3tDkFZx2JLmZ4WX75WVQmE4VCCpo2JYg2S7AZJg2PYOxy5LNzcCVngiZZeTndhntY802Gn6PysKrpUBl9rlca3sD5mSl3ovpjT4bCLJyfgt1I1PAarvmSaJ3u18BameENTGCEesGIEt1m36s8fGbN8Aje6wQzfyEiSqmIksCob9PqrsDwC8bm9JHzlIR5uitaTqprFB8ND+BKudTPouhA8LPycDZvSXSB0fAKxqX4kmaDhpdQSLuW34JLF131GR7AhEJSLuk4+zRtVSWTDi7nV3w0vIVnqz1zYFwEq6ysdcMj+IKfCYVzalF8bEcI/Gx4DMuz87HOogVt4uBb0gzER9xteAtHdWbM61inZ2Pu2nTkE17lbsMLzMRs7FE6bhUfuWbRiwwPYRUtql1SqcwTCgmT1QW//SiGu0qGE8ygro353MMbamvKd1rSseEejsobFQpblGAl0abUYvhLWDlF85QwbJXNqSXeujbDHYwl9VRqXbro25ycJV/DI1iFc+yeeViCbVXe4PwMmr2eDfeBkR2n8qx2QzF55r4qbRVFDXd+VhE4cTuQj5WAy7OZo+X1aaVnwy/4QcqNU5uHpivlqNSy8bPhN9Vhz4Osm9C6bWlydwpWZngDly85yAmjRtzNqg75jRy9yt2GFxj9sazAKFjHOnMKug01b4bH8I0/ZlW0cKzpdIOC5jD/Brjb8DdwSVS1oLQZ2krzto6ihjcwteAhZBeaDVEqEHPADA9gHskiOS+JRpUwjQ6EMNm3eIbXDS8md8/L2a5hmWEyK+eLDI/h35rh3gz3Zrg3w70Z7u1v8D/hrU6ggrCE7QAAAABJRU5ErkJggg=="
   this.imageString=this.route.snapshot.params['setQrImageUrl'];
   console.log(this.imageString);
    this.setQrImageUrl=this.sanitizer.bypassSecurityTrustUrl('data:image/PNG;base64,'+ this.imageString);
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
    this.otpErrFlag=true;
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
