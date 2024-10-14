import { Component } from '@angular/core';
import { AuthService } from '../../../core/Services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorr:string='';
  isloading = false;
  constructor(private _AuthService:AuthService  ,private _router:Router){}
  LoginForrm:FormGroup=new FormGroup({
     
     
      email:new FormControl(null ,[Validators.required,Validators.email]),
      password:new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z0-9a-z]{6,}/)]),
     
     })
     SubmitLogin(forminfo:FormGroup)
     {
      this.isloading=true;
      this._AuthService.Login(forminfo.value).subscribe((response)=>{
       
      if(response.message === "success"){
        //خزنت ال token
        this.isloading=false;
        localStorage.setItem('userToken',response.token);
         this._AuthService.DecodeUser();
          this._router.navigate(['home']);
        }
      },
    (error) => {
      this.isloading=false;
      if (error.status === 409) {
        alert("User already exists");
      }
    }
  )}
}
