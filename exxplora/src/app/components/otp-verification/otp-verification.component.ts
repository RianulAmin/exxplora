import { Component } from '@angular/core';
import { EmailType, MailServiceService } from '../../services/mail-service.service';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  constructor() { }

  otp: string = ''

  handleSubmit = async () => {
    
  }

}
