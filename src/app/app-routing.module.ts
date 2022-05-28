import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import {HomeComponent} from "./component/home/home.component";
import { AuthGuardGuard } from './auth-guard.guard';
import {QrcodeComponent} from './component/qrcode/qrcode.component';
import {PasswordnotifictaionComponent} from "./component/passwordnotifictaion/passwordnotifictaion.component";

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'login', component: LoginComponent,canActivate: [AuthGuardGuard]},
  {path:'signup', component: SignupComponent},
   {path:'home', component: HomeComponent},
  {path:'home/:logoutFlag', component: HomeComponent},
   {path:'qrcode', component: QrcodeComponent},
   {path:'qrcode/:setQrImageUrl', component: QrcodeComponent},
  {path:'password',component:PasswordnotifictaionComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
