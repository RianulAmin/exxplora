import { Component } from '@angular/core';
import { EmailType, MailServiceService } from '../../services/mail-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private mailService: MailServiceService){}

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  send = async () => {
    let res = await this.mailService.sendOTP("2580", "asrafulalam9454@gmail.com", EmailType.CREATE_ACCOUNT_VERIFICATION);
    if (res) alert("OTP send");
    else alert("Failed to send OTP");
  }

  generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

}
