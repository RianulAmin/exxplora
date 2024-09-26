import { Component } from '@angular/core';
import { EmailType, MailServiceService } from '../../services/mail-service.service';
import { RegistrationInfo } from '../../interfaces/registrationInfo';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  constructor(private mailService: MailServiceService) { }

  user: RegistrationInfo = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };


  handleSubmit = async () => {
    //validation -------- 


    let generatedOtp = this.generateOtp();

    let res = await this.mailService.sendOTP(generatedOtp, this.user.email, EmailType.CREATE_ACCOUNT_VERIFICATION);
    if (res) {
      //navigate to otp verification
      //bind user object and otp
    }
    else {
      //show error (mail send failed)
    }
  }

  generateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    return otp.toString();
  }

}
