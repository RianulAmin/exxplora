import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  user = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
  ) { }


  async handleSubmit(signInForm: any) {
    if (signInForm.valid) {


    } else {
      alert('Please ensure all fields are filled correctly and passwords match.');
    }
  }
}
