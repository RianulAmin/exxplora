import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationInfo } from '../../interfaces/registrationInfo';
import { RegistrationService } from '../../services/registration.service';
import { DataTransferService } from '../../services/data-transfer.service';


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

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private registrationService: RegistrationService,
    private dataTransferService: DataTransferService
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

  handleSubmit() {
    if (this.otpInput == this.generatedOtp) {
      alert('OTP verified successfully!');
      const registrationInfo: RegistrationInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };

      this.registrationService.registerUser(registrationInfo).subscribe(
        (response) => {
          alert('Registration successful!');
          this.dataTransferService.clearData();
          this.router.navigate(['/success']);
        },
        (error) => {
          alert('Registration failed. Please try again.');
        }
      );
    } else {
      alert('Invalid OTP');
    }
  }
}