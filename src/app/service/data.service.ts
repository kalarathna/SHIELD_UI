import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { LoginModel } from '../model/loginModel';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
// import { SignUpModel } from 'src/app/model/signUpModel';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { SignUpModel } from '../model/signUpModel';
import { UserContent } from '../model/userContent';
import {OtpModel} from "../model/otpModel";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'https://file.io';
  baseAPIURL = 'http://localhost:8080'
  awsAPIURL="http://shield.us-east-1.elasticbeanstalk.com";

  private hostLoginApi = '/shield/login';
  private hostsignupApi = '/shield/createuser';
  private hostSaveDocument = '/shield/savefile';
  private hostUploadDocument = '/shield/uploadfile';
  private hostEmailAPI = "/shield/sendemail";
  private hostGetContent = "/shield/getcontent";
  private hostverifyOTP = "/shield/verifyOTP";
  private hostDownload = "/shield/downloadcontent";
  private hostDeleteAPI = "/shield/deletefile";
  private hostSavePassword="/shield/savepassword";
  private hostGetAllPassword="/shield/getplist";
  private hostShareContent="/shield/sharecontent";

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(this.awsAPIURL, formData);
  }

  login(loginModel: LoginModel): Observable<any> {

    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post(
      this.awsAPIURL+this.hostLoginApi, loginModel, {
        headers
      });
  }

  registerNewUser(signupModel: SignUpModel): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post(
      this.awsAPIURL+this.hostsignupApi, signupModel, {
        headers
      });
  }

  saveDocument(file: FormData, expiryDate: string, userName: any, documentName: string): Observable<any> {
    //   const headers = new HttpHeaders().set('content-type', 'multipart/form-data');
    let params = new HttpParams();
    params = params.append('expiryDate', expiryDate);
    params = params.append('userName', userName);
    params = params.append('documentName', documentName);
    return this.httpClient.post(
      this.awsAPIURL+this.hostUploadDocument, file, {
        params
      });
  }

  sendEmail(username: String): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post(
      this.awsAPIURL+this.hostEmailAPI, username, {
        headers
      });
  }

  getAllContent(userName: any): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let params = new HttpParams();
    params.append('userName', userName);
    // params.append('code',otp);
    return this.httpClient.post(
      this.awsAPIURL+this.hostGetContent, userName, {
        headers
      });

  }

  authenticateOtp(otpModel: OtpModel): Observable<any> {
    console.log("inside data service " + otpModel.userName);
    console.log(otpModel.otpCode);
    const headers = new HttpHeaders().set('content-type', 'application/json');
    // let params= new HttpParams();
    // params.append('userName', userName);
    // params.append('code',otp);
    return this.httpClient.post(
      this.awsAPIURL+this.hostverifyOTP, otpModel, {
        headers
      });

  }

  downloadDocument(userContentId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userContentId', userContentId);
    return this.httpClient.post(
      this.awsAPIURL+this.hostDownload, {
        params
      });
  }

  deleteContent(userContentId: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userContentId', userContentId);
    return this.httpClient.post(
      this.awsAPIURL+this.hostDeleteAPI, params, {});
  }


  savePasswordNotification(passwordNotificationModel: any): Observable<any> {

    return this.httpClient.post(
      this.awsAPIURL+this.hostSavePassword, passwordNotificationModel, {});

  }

  getAllPasswordList(userName: any): Observable<any> {
   // const headers = new HttpHeaders().set('content-type', 'application/json');
    let params = new HttpParams();
    params.append('userName', userName);
    return this.httpClient.post(
      this.awsAPIURL+this.hostGetAllPassword, userName, {

      });

  }

  shareContent( userName: any, shareEmail: string, documentId: string ): Observable<any> {
    let params = new HttpParams();
    params = params.append('userName', userName);
    params = params.append('shareEmail', shareEmail);
    params = params.append('documentId', documentId);
    return this.httpClient.post(
      this.awsAPIURL+this.hostShareContent, params, {});
  }
}


  // signUp(signupModel: SignUpModel):Observable<any>{


  //     // return this.http.post('$(this.baseUrl)'createuser, signupModel);
  // }

