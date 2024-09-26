import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { RegistrationInfo } from '../../interfaces/registrationInfo';

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
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.generatedOtp = navigation.extras.state['otp'];
      this.email = navigation.extras.state['email'];
      this.firstName = navigation.extras.state['firstName'];
      this.lastName = navigation.extras.state['lastName'];
      this.password = navigation.extras.state['password'];
    }
  }

  handleSubmit() {
    if (this.otpInput == this.generatedOtp) {
      const registrationInfo: RegistrationInfo = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      };
      this.registrationService.registerUser(registrationInfo).subscribe(
        (response) => {
          alert('Registration successful!');
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