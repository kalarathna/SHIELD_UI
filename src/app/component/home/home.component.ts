import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserContent } from 'src/app/model/userContent';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { DataService } from 'src/app/service/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import { isUndefined, isNullOrUndefined } from 'is-what';
import {ContentModel} from 'src/app/model/contentModel';
import {FileDetails} from "../../model/FileDetails";
import {DatePipe} from "@angular/common";

interface PasswordNotificationModel{

  applicationName:string;
  creationDate:Date;
  userName:any;
  userID:any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  //public uploadExpiryDate:string;
  //public docuemntExpiryDate:Date;
  userContentID:string;
  public applicationName:string;
  //public creationDate:Date;
  public passwdNotification=false;
  public status:string;
  ngbDatepicker:any;
  saveFileErrFlag=false;
  saveFileErrDesc: String;
  saveFileSuccessFlag: String;
  saveFileSuccessDesc: String;
  httpErrorResp = false;
  uploadedFiles: File[] = [];
  passwordResultsList:[]=[];
  modalRef: BsModalRef;
  newDocumentForm: FormGroup;
  newPasswordForm:FormGroup;
  newUploadForm:FormGroup;
  newShareForm:FormGroup;
  passwordNotificationModel: PasswordNotificationModel;
  userContent: UserContent= new UserContent();
  files: File;
  submitted = false;
  logoutFlag=false;
  public userName='';
  public searchResultList= new ContentModel();
  public listSize: number;
  public noResult = false;
  public shareSuccessMsg="Document Shared Successfully.";
  public uploadSuccessMsg="File Uploaded Successfully.";
  public documentSuccessMsg="Document Saved Successfully.";
  public passwordSaveMsg="Password Notification Saved Successfully.";
  public deleteMsg="Content deleted successfully.";
  public uploadStatusFlag=false;
  public saveFileStatusFlag=false;
  public passwordStatusFlag=false;
  public shareStatusFlag=false;
  public deleteStatusFlag=false;





  private datePipe: DatePipe;



  public books:Array<any>=[
   {fileName: 'test docuemnt 2', fileSizes: 153383, fileExpiryDate:"03-11-2022"},
  {fileName: 'test docuemnt 2', fileSizes: 153383, fileExpiryDate: "03-11-2025"} ];
 responseObject: ContentModel=new ContentModel();
  contentArray: FileDetails[];


  constructor(private modalService: BsModalService, private fb: FormBuilder,
    private router: Router, private dataservice:DataService, private route: ActivatedRoute) {
    this.logoutFlag=this.route.snapshot.params['logoutFlag'];

  }

  getExpiryDate(event:any){
    //this.expiryDate=event;

  }

  get shareEmail(){
    return this.newShareForm.get('shareMail');
  }

  get uploadExpiryDate(){
    return this.newUploadForm.get('uploadExpiryDate');
  }

  get uploadFile(){
    return this.newUploadForm.get('uploadFile');
  }

  get uploadDocumentName(){
    return this.newUploadForm.get('uploadDocumentName');
  }
  get documentName() {
    return this.newDocumentForm.get('documentName');
  }


  get documentContent() {
    return this.newDocumentForm.get('documentContent');
  }

  get expiryDate() {
    return this.newDocumentForm.get('expiryDate');
  }

  get appliactionName(){
    return this.newPasswordForm.get('applicationName');
  }
  get creationDate(){
    return this.newPasswordForm.get('creationDate');
  }
  onChange(event: any) {
    if (event.target.files) {
      for (const i of event.target.files) {
        this.uploadedFiles.push(i);
      }
    }
  }

  onUpload() {
    const fileData=new File([this.newUploadForm.value.uploadFile],[this.newUploadForm.value.uploadExpiryDate].toString());
    const  formData: FormData = new FormData();
    formData.append('file', fileData);
    const userName=sessionStorage.getItem('userName');
    const uploadExpiryDate=this.newUploadForm.value.uploadExpiryDate.toLocaleDateString();
    const uploadDocumentName=this.newUploadForm.value.uploadDocumentName;
   if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      this.dataservice.saveDocument(formData,uploadExpiryDate.toString(),userName,uploadDocumentName).subscribe(response =>{
          if(!response.errorFlg){
            console.log(response);
            this.status=response;
            if(this.status==="success"){
              this.uploadStatusFlag=true;
              this.getAllContent();
            }
            this.closeModal();
          }
          else{
            this.saveFileErrDesc = 'Internal Server Error Try again';
            this.router.navigate(['/home']);
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          this.httpErrorResp = true;
        })
    }  }

  openModal(template: TemplateRef<any>) {
    this.passwdNotification = false
    this.modalRef = this.modalService.show(template);
  }
  openModelShare(template:TemplateRef<any>, rowdata:any){
    this.userContentID=rowdata;
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  savePasswordNotification(){
    this.passwordNotificationModel=this.newPasswordForm.value
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      this.passwordNotificationModel.userName = sessionStorage.getItem('userName')
      this.dataservice.savePasswordNotification(this.passwordNotificationModel).subscribe(response => {
          if (!response.errorFlg) {
            console.log(response);
            this.status = response;
            if (this.status === "success") {
              this.passwordStatusFlag=true;
              this.getAllPasswordList();
            }
            this.closeModal();
          } else {
            this.saveFileErrDesc = 'Internal Server Error Try again';
            this.router.navigate(['/home']);
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          this.httpErrorResp = true;
        })
    }
  }

  deleteUploadedDocument(rowData: any) {
    this.dataservice.deleteContent(rowData).subscribe(response =>{
        if(!response.errorFlg){
          console.log(response);
          this.status=response;
          if(this.status==="success"){
            this.deleteStatusFlag=true;
            this.getAllContent();
          }
          this.closeModal();
        }
        else{
          this.saveFileErrDesc = 'Internal Server Error Try again';
          this.router.navigate(['/home']);
        }
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/home']);
        this.httpErrorResp = true;
      })
  }

  saveNewDocument() {
    const fileData = new File([this.newDocumentForm.value.documentContent], this.newDocumentForm.value.documentName, {type: '.txt'});
    const userName=sessionStorage.getItem('userName');
    const  formData: FormData = new FormData();
    formData.append('file', fileData);
    this.userContent.userName=userName;
    const expiryDate=this.newDocumentForm.value.expiryDate.toLocaleDateString();
    const documentName=this.newDocumentForm.value.documentName;
    console.log(expiryDate);
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
        this.dataservice.saveDocument(formData,expiryDate.toString(),userName,documentName).subscribe(response =>{
         if(!response.errorFlg){
          console.log(response);
          this.status=response;
          if(this.status==="success"){
            this.saveFileStatusFlag=true;
            this.getAllContent();
        }
        this.closeModal();
      }
            else{
            this.saveFileErrDesc = 'Internal Server Error Try again';
            this.router.navigate(['/home']);
          }

        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          this.httpErrorResp = true;
        })
      }
  }

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {

    this.getAllContent();
    this.newDocumentForm = this.fb.group({
      documentName: new FormControl('', {validators: [Validators.required]}),
      documentContent: new FormControl('', {validators: [Validators.required]}),
      expiryDate:new FormControl(''),
    });

    this.newPasswordForm = this.fb.group({
      applicationName: new FormControl(this.passwordNotificationModel, {validators:[Validators.required]}),
      creationDate: new FormControl(this.passwordNotificationModel, {validators:[Validators.required]}),

    });

     this.newUploadForm=this.fb.group({
       uploadExpiryDate:new FormControl('', {validators:[Validators.required]}),
       uploadDocumentName: new FormControl('',{validators:[Validators.required]}),
     })

    this.newShareForm=this.fb.group({
      shareEmail: new FormControl('',{validators:[Validators.required]}),
    })

    // this.dataservice.sendEmail(sessionStorage.getItem('userName').subscribe(response =>{
    //    }))
  }

  getAllContent(){
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      const userName=sessionStorage.getItem('userName')
      this.dataservice.getAllContent(userName).subscribe(response =>{
          if(!response.errorFlg){
            console.log(response);
            this.searchResultList = response;
            this.responseObject= response;
           this.contentArray=this.responseObject.fileDetails;
            console.log(this.contentArray);
            console.log(this.books);
            if(this.contentArray.length===0){
              this.noResult = true;
            }
          }
          else{
            this.saveFileErrDesc = 'Internal Server Error Try again';
            this.router.navigate(['/home']);
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          this.httpErrorResp = true;
        })
    }
  }

  downloadDocument(userContentId:string){
    this.dataservice.downloadDocument(userContentId).subscribe(response =>{
        if(!response.errorFlg){
          console.log(response);
        }
        else{
          this.saveFileErrDesc = 'Internal Server Error Try again';
          this.router.navigate(['/home']);
        }
      },
      (err: HttpErrorResponse) => {
        this.router.navigate(['/home']);
        this.httpErrorResp = true;
      })
  }

  getAllPasswordList(){
    this.passwdNotification=true;
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      const userName=sessionStorage.getItem('userName')
      this.dataservice.getAllPasswordList(userName).subscribe(response =>{
          if(!response.errorFlg){
            console.log(response);
            this.passwordResultsList = response;
            if(this.passwordResultsList.length===0){
              this.noResult = true;
            }
          }
          else{
            this.saveFileErrDesc = 'Internal Server Error Try again';
            this.router.navigate(['/home']);
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          this.httpErrorResp = true;
        })
    }
  }

  shareContent() {

    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      const userName = sessionStorage.getItem('userName')
      const shareEmail=this.newShareForm.value.shareEmail;
      this.dataservice.shareContent(userName,shareEmail,this.userContentID).subscribe(response => {
          if (!response.errorFlg) {
            console.log(response);
            this.status = response;
            if (this.status === "success") {
              this.shareStatusFlag=true;
              this.getAllContent();
            }
            this.closeModal();
          } else {
            this.saveFileErrDesc = 'Internal Server Error Try again';
            this.router.navigate(['/home']);
          }
        },
        (err: HttpErrorResponse) => {
          this.router.navigate(['/home']);
          this.httpErrorResp = true;
        })

    }
  }
}
