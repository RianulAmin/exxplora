import { Component } from '@angular/core';
import { EmailType, MailServiceService } from '../../services/mail-service.service';
import { RegistrationService } from '../../services/registration.service';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  constructor(private registrationService: RegistrationService) { }

  otp: string = ''

  handleSubmit = async () => {
    if(this.otp == "ager page theke pawa otp"){
      //this.registrationService.registerUser(oi user object ta)
      //then redirect
    }
  }

}
