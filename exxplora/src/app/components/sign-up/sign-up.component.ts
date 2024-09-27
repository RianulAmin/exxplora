import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmailType, MailServiceService } from '../../services/mail-service.service';
import { RegistrationService } from '../../services/registration.service';
import { DataTransferService } from '../../services/data-transfer.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
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
    private mailService: MailServiceService,
    private dataTransferService: DataTransferService
  ) { }

  generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

  async handleSubmit(signUpForm: any) {
    if (signUpForm.valid && this.passwordsMatch()) {


      this.registrationService.isEmailExist(this.user.email).subscribe(
        async (response) => {
          if (response.data == false) { // not exist
            this.generatedOtp = this.generateOtp();
            const res = await this.mailService.sendOTP(this.generatedOtp, this.user.email, EmailType.CREATE_ACCOUNT_VERIFICATION);
            if (res) {
              this.dataTransferService.setData('otp', this.generatedOtp);
              this.dataTransferService.setData('userInfo', {
                email: this.user.email,
                firstName: this.user.firstName,
                lastName: this.user.lastName,
                password: this.user.password
              });
              this.router.navigate(['/otp-verification']);
            } else {
              alert('Failed to send OTP. Please try again.');
            }
          }
          else {
            alert('Email already exist. Please use other email to proceed');
          }
        },
        (error) => {
          alert('Failed to check email existance.');
        }
      )

    } else {
      alert('Please ensure all fields are filled correctly and passwords match.');
    }
  }

  passwordsMatch() {
    return this.user.password === this.user.confirmPassword;
  }
}