import { Component } from '@angular/core';
import { EmailType, MailServiceService } from '../../services/mail-service.service';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css'
})
export class OtpVerificationComponent {
  constructor(private mailService: MailServiceService) { }

  otp: string = ''


  //sendOTP re onInit e invoke kor r email ager page theke nia ay. Temp Otp re otp er loge verify kor
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
