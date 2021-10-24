import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';


const routes: Routes = [ 
  {path: '' , redirectTo:'login', pathMatch:'full' },
  {path: 'login' , component: LoginComponent },
  {path: 'forget-password',component: ForgotPasswordComponent},
  {path: 'create-account',component: CreateAccountComponent},
  {path: 'home',component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
