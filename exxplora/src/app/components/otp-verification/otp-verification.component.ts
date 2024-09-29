import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationInfo } from '../../interfaces/registrationInfo';
import { RegistrationService } from '../../services/registration.service';
import { DataTransferService } from '../../services/data-transfer.service';
import { EmailType, MailServiceService } from '../../services/mail-service.service';
import { AuthService } from '../../services/auth.service';
import { Signin } from '../../interfaces/signin';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {

  otpInput: string = '';
  generatedOtp: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  isOtpSent: boolean = true;
  resendOtpDisabled: boolean = false;  

  constructor(
    private router: Router, 
    private registrationService: RegistrationService,
    private mailService: MailServiceService,
    private dataTransferService: DataTransferService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.generatedOtp = this.dataTransferService.getData('otp');
    const userInfo = this.dataTransferService.getData('userInfo');
    if (userInfo) {
      this.email = userInfo.email;
      this.firstName = userInfo.firstName;
      this.lastName = userInfo.lastName;
      this.password = userInfo.password;
    }
  }

  async handleSubmit() {
    if (this.otpInput === this.generatedOtp) {
      alert('OTP verified successfully!');
      const registrationInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

      this.registrationService.registerUser(registrationInfo).subscribe(
        (response) => {
          console.log(response.Messages);
          this.dataTransferService.clearData();
          let signin: Signin = {
            Email: registrationInfo.email,
            Password: registrationInfo.password
          }
          this.authService.signin(signin).subscribe(
            res => {
              if(!res.IsError) {
                this.authService.setToken(res.Data);
                this.router.navigate(['/profile-setup']);
              }
            },
            err => {
              this.router.navigate(['sign-in']);
            }
          )
          
        },
        (error) => {
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Invalid OTP');
    }
  }

  async resendOtp() {
    this.resendOtpDisabled = true; 
    this.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();  
    const res = await this.mailService.sendOTP(this.generatedOtp, this.email, EmailType.CREATE_ACCOUNT_VERIFICATION);
    if (res) {
      alert('A new OTP has been sent to your email.');
      this.dataTransferService.setData('otp', this.generatedOtp);
      this.isOtpSent = true;
      setTimeout(() => {
        this.resendOtpDisabled = false; 
      }, 30000); 
    } else {
      alert('Failed to resend OTP. Please try again.');
      this.resendOtpDisabled = false;
    }
  }
}