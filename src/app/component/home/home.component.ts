import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { UserComponent } from '../user/user.component';
import { UserContent } from 'src/app/model/userContent';
import {Router, ActivatedRoute, Params} from "@angular/router";
import { DataService } from 'src/app/service/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import { isUndefined, isNullOrUndefined } from 'is-what';
import {ContentModel} from 'src/app/model/contentModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  expiryDate:Date;
  ngbDatepicker:any;
  saveFileErrFlag: String;
  saveFileErrDesc: String;
  saveFileSuccessFlag: String;
  saveFileSuccessDesc: String;
  httpErrorResp = false;
  uploadedFiles: File[] = [];
  modalRef: BsModalRef;
  newDocumentForm: FormGroup;
  userContent: UserContent= new UserContent();
  files: File[] = [];
  submitted = false;
  logoutFlag:any;
  public searchResultList: any = [];
  public listSize: number;
  public noResult = false;

 public books:Array<any>=[
  {documentName:"Test", documentSize:"5 KB", date:"05-11-2022"},
  {documentName:"Test2", documentSize:"6 KB", date:"22-06-2022"},
  {documentName:"Test3", documentSize:"8 KB", date:"15-08-2022"},
  {documentName:"Test4", documentSize:"8 KB", date:"24-12-2022"}
    ];
  contentArray: Array<any> = new Array();


  constructor(private modalService: BsModalService, private fb: FormBuilder,
    private router: Router, private dataservice:DataService, private route: ActivatedRoute) {
  }

  get documentName() {
    return this.newDocumentForm.get('documentName');
  }


  get documentContent() {
    return this.newDocumentForm.get('documentContent');
  }

  onChange(event: any) {
    if (event.target.files) {
      for (const i of event.target.files) {
        this.uploadedFiles.push(i);
      }
    }
  }

  onUpload() {
    this.files = this.uploadedFiles;
    this.closeModal();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  deleteUploadedDocument(rowData: any) {
    for (const i in this.uploadedFiles) {
      if (this.uploadedFiles[i].name.match(rowData)) {
        this.uploadedFiles.splice(Number(i), 1);
      }
    }
  }

  saveNewDocument() {
    console.log("document save()");
    const file = new File([this.newDocumentForm.value.documentContent], this.newDocumentForm.value.documentName, {type: '.txt'});
    const userName=sessionStorage.getItem('userName');
    this.userContent.userName=userName;
    this.userContent=this.newDocumentForm.value;
        if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      this.dataservice.saveDocument(this.userContent).subscribe(response =>{
      if(!response.errorFlg){
        console.log(response);
        this.files=response;
        this.saveFileSuccessDesc="Document Saved Successfully."
        this.contentArray=response;
       // this.uploadedFiles.push(file);
       // this.onUpload();
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
    this.logoutFlag=this.route.snapshot.params['logoutFlag'];
    if (!isNullOrUndefined(sessionStorage.getItem('userName'))) {
      const userName=sessionStorage.getItem('userName')
      this.dataservice.getAllContent(userName).subscribe(response =>{
        if(!response.errorFlg){
          console.log(response);
          this.searchResultList = response;
          this.listSize = this.searchResultList.length;
          this.contentArray = this.searchResultList;
          if(this.contentArray.length===0){
            this.noResult = true;
          }
          for(let index=0;index<this.contentArray.length;index++){
            if(this.contentArray[index].documentName!=null){

            }
          }
          //this.saveFileSuccessDesc="Document Saved Successfully."
         // this.uploadedFiles.push(files);
         // this.onUpload();
         // this.closeModal();

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

    this.newDocumentForm = this.fb.group({
      documentName: new FormControl('', {validators: [Validators.required]}),
      documentContent: new FormControl('', {validators: [Validators.required]}),
    });

    // this.dataservice.sendEmail(sessionStorage.getItem('userName').subscribe(response =>{
    //    }))


  }

}
