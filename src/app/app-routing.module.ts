import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './Components/Auth/forget-password/forget-password.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { HomeComponent } from './Components/Auth/home/home.component';
import { AuthGuard } from './Components/Services/auth.guard';
import { NotfoundComponent } from './Components/Auth/notfound/notfound.component';

const routes: Routes = [
  {path:'' ,redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
   {path:'forgetPassword',component:ForgetPasswordComponent},
   {path:'home', canActivate:[AuthGuard],component:HomeComponent},
   {path:'**',component:NotfoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
