import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { ProfileSetupComponent } from './components/profile-setup/profile-setup.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'otp-verification',
    component: OtpVerificationComponent
  },
  {
    path: 'profile-setup',
    component: ProfileSetupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
