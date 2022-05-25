import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { LoginModel } from '../model/loginModel';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
// import { SignUpModel } from 'src/app/model/signUpModel';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { SignUpModel } from '../model/signUpModel';
import { UserContent } from '../model/userContent';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseApiUrl = 'https://file.io';
  baseAPIURL='http://localhost:8080/'

  private hostLoginApi = 'http://localhost:8080/shield/login';
  private hostsignupApi='http://localhost:8080/shield/createuser';
  private hostSaveDocument='http://localhost:8080/shield/savefile';
  private hostUploadDocument='http://localhost:8080/shield/uploadfile';
  private hostEmailAPI="http://localhost:8080/shield/sendemail";
  private hostGetContent="http://localhost:8080/shield/getcontent";
  private hostverifyOTP="http://localhost:8080/shield/verifyOTP";

  constructor(private httpClient: HttpClient,
    private router: Router) { }

  upload(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(this.baseApiUrl, formData);
  }

  login(loginModel:LoginModel):Observable<any>{

    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post(
      this.hostLoginApi, loginModel, {
        headers
      });
    }

    registerNewUser(signupModel:SignUpModel): Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this.httpClient.post(
        this.hostsignupApi, signupModel, {
          headers
        });
    }

    saveDocument(userContent: UserContent):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this.httpClient.post(
        this.hostSaveDocument, userContent, {
          headers
        });
    }

    sendEmail(username:String):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');
      return this.httpClient.post(
        this.hostEmailAPI, username, {
          headers
        });
    }

    getAllContent(userName: any):Observable<any>{
      const headers = new HttpHeaders().set('content-type', 'application/json');
      let params= new HttpParams();
      params.append('userName', userName);
     // params.append('code',otp);
      return this.httpClient.post(
        this.hostGetContent, userName, {
          headers
        });

    }

  authenticateOtp(userName: any, otp:string):Observable<any>{
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let params= new HttpParams();
    params.append('userName', userName);
    params.append('code',otp);
    return this.httpClient.post(
      this.hostverifyOTP, userName, {
        headers, params
      });

  }
  }


  // signUp(signupModel: SignUpModel):Observable<any>{


  //     // return this.http.post('$(this.baseUrl)'createuser, signupModel);




  // }

