import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { UserComponent } from './component/user/user.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { UploadComponent } from './component/upload/upload.component';
import { QrcodeComponent } from './component/qrcode/qrcode.component';
import {HttpClientModule} from "@angular/common/http";
import {FileUploadModule} from "primeng/fileupload";
import {InputTextModule} from "primeng/inputtext";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextareaModule} from "primeng/inputtextarea";
import {TableModule} from "primeng/table";
import {BsModalRef, BsModalService, ModalModule} from "ngx-bootstrap/modal";
import {CalendarModule} from "primeng/calendar";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordnotifictaionComponent } from './component/passwordnotifictaion/passwordnotifictaion.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UploadComponent,
    QrcodeComponent,
    PasswordnotifictaionComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    FileUploadModule,
    HttpClientModule,
    ModalModule.forRoot(),
    InputTextareaModule,
    TableModule,
    CalendarModule,

  ],
  providers: [BsModalRef, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
