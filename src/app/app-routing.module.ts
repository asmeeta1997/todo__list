import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginComponent } from './components/login/login.component';
import {CreateAccountComponent} from './components/create-account/create-account.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import { SetpasswordComponent } from './components/setpassword/setpassword.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AuthGuard } from './components/services/auth.guard';
 
const routes: Routes = [ 
  {path: '' , redirectTo:'login', pathMatch:'full' },
  {path: 'login' , component: LoginComponent },
  {path: 'forget-password',component: ForgotPasswordComponent},
  {path: 'create-account',component: CreateAccountComponent},
  {path: 'home',component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'set-password',component: SetpasswordComponent},
  {path: 'reset-password',component: ResetPasswordComponent},
  // {path: '**', component:NotFound}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
