import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
    step1: boolean = true;
    step2: boolean = false;
    step3: boolean = false;
    message: string = '';
    isloading = false;
  
    forgetpasswordform: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  
    ResetCodeform: FormGroup = new FormGroup({
      resetCode: new FormControl('', [Validators.required]),
    });
  
    newPasswordform: FormGroup = new FormGroup({
      newPassword: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9a-z]{6,}/)
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  
    constructor(private _AuthService: AuthService, private router:Router,private _toast:ToastService) {}
  
  
    handelforgetpassword(): void {
      this.isloading = true;
      let emailinfo = this.forgetpasswordform.value;
  
      this._AuthService.forgetPassword(emailinfo).subscribe({
        next: (response) => {
          this._toast.showToast('success',response.message)
          console.log(response);
          this.isloading = false;
          
          this.step1 = false;
          this.step2 = true;
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
          this.message = err.error.message;
       
        },
      });
    }
  
    hanelResetCode() {
      this.isloading = true;
      let resetCode = this.ResetCodeform.value;
  
      this._AuthService.verifyRestCode(resetCode).subscribe({
        next: (response) => {
          console.log(response);
          this.isloading = false;
          
          this.step2 = false;
          this.step3 = true;
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
          this.message = err.error.message;
        },
      });
    }
  
    handelnewPassword() {
      this.isloading = true;
      let newPassword = this.newPasswordform.value;
     console.log(newPassword)
      this._AuthService.resetPassword(newPassword).subscribe({
        next: (response) => {
          console.log(response);
          this.isloading = false;
          if (response.token) {
            localStorage.setItem("userToken", response.token);
            this.message = 'password reset successfully';
          
            this.step3 = false;
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
          this.isloading = false;
        
          this.message = err.error.message;
        },
      });
    }
  
}


