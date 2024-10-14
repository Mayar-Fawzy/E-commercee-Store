import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorr:string='';
  isloading = false;
  errorpassword:string='';
  constructor(private _AuthService:AuthService  ,private _router:Router){}
  registerForm:FormGroup=new FormGroup({
     
     
      email:new FormControl(null ,[Validators.required,Validators.email]),
      password:new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z0-9a-z]{6,}/)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      rePassword:new FormControl(null ,[Validators.required, Validators.pattern(/^[A-Z0-9a-z]{6,}/)]),

     
     })
     SubmitRegister(forminfo:FormGroup)
     {
      this.isloading=true;
      this._AuthService.Register(forminfo.value).subscribe((response)=>{
       
      if(response.message === "success"){
        //خزنت ال token
        this.isloading=false;
      
          this._router.navigate(['/login']);
        }
      },
    (error) => {
      console.log(error);
      this.isloading=false;
      if (error.status === 409) {
        alert("User already exists");
      }
      this.errorpassword=error.error.errors.msg;
    }
  )}
}
