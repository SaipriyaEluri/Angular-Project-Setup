import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loginForm: FormGroup;
  showPassword: boolean = false;

  constructor(private router : Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(){
    console.log(this.loginForm.value,'login form')
    if(this.loginForm.valid){
      const obj = {
        email : "saipriya.eluri@versatilecommerce.com",
        password : "12345"
      }
      if(this.loginForm.value.email === obj.email && this.loginForm.value.password === obj.password){
          console.log("User is logged in")
          this.router.navigate(['/admin/ftp-list'])
      }else{
        console.log("Login fails invalid details")
      }

      // this.service.Login(this.loginForm.value).subscribe((res:any) => {
      //   localStorage.setItem('token', res.accessToken);
      //   this.router.navigate(['/superadmin/dashboard'])
      // })
    }
  }
}
