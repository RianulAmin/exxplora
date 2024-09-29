import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { Signin } from '../../interfaces/signin';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  user: Signin = {
    Email: '',
    Password: '',
  };

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) { }


  async handleSubmit(signInForm: any) {
    if (signInForm.valid) {

      this.authService.signin(this.user).subscribe(
        res => {
          if(res.IsError == false) {
            alert("Token: " + res.Data);
            this.authService.setToken(res.Data);
            this.router.navigate(['']);
          }
          else alert("Invalid Credentials");
        },
        err => {
          alert("Failed to connect with server");
        }
      )
    } else {
      alert('Please ensure all fields are filled correctly and passwords match.');
    }
  }
}
