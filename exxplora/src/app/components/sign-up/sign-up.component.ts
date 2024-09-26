import { Component } from '@angular/core';
import { EmailType, MailServiceService } from '../../services/mail-service.service';
import { RegistrationInfo } from '../../interfaces/registrationInfo';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  
  generatedOtp: string = '';

  constructor(
    private router: Router, 
    private registrationService: RegistrationService,
    private mailService: MailServiceService
  ) {}

  passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  generateOtp(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  async handleSubmit(signUpForm: any) {
    if (signUpForm.valid && this.passwordsMatch()) {
      this.generatedOtp = this.generateOtp();
      const res = await this.mailService.sendOTP(this.generatedOtp, this.user.email, EmailType.CREATE_ACCOUNT_VERIFICATION);
      
      if (res) {
        this.router.navigate(['/otp-verification'], {
          state: {
            otp: this.generatedOtp, 
            email: this.user.email, 
            firstName: this.user.firstName,
            lastName: this.user.lastName,
            password: this.user.password
          }
        });
      } else {
        alert('Failed to send OTP. Please try again.');
      }
    } else {
      alert('Please ensure all fields are filled correctly and passwords match.');
    }
  }
}