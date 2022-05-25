import {Component, OnInit, TemplateRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
// import { UserModel } from '../modelclass/userModel';

interface UserModel {
  value:Date;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public dateTime: Date;
  uploadedFiles: File[] = [];
  modalRef: BsModalRef;
  newDocumentForm: FormGroup;
  modelForm: FormGroup;
  files: File[] = [];
  submitted = false;
   userModel: UserModel;
   value: Date;
  constructor(private modalService: BsModalService, private fb: FormBuilder) {
  }
  get creation() {
    return this.modelForm.get('creation');
  }

  get model() {
    return this.modelForm.get('model');
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
    const file = new File([this.modelForm.value.creation], this.modelForm.value.model, {type: '.txt'});
    this.uploadedFiles.push(file);
    this.onUpload();
  }


  onSubmit() {
    this.submitted = true;
  }

  ngOnInit(): void {
    this.modelForm = this.fb.group({
      creation: new FormControl('', {validators: [Validators.required]}),
      model: new FormControl('', {validators: [Validators.required]}),
    });
  }

}
