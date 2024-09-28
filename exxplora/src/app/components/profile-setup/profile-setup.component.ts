import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.css'
})
export class ProfileSetupComponent {
  active: number = 0;

    name: string = "";

    email: string = "";

    password: string = "";

    option1: boolean | undefined = false;

    option2: boolean | undefined = false;

    option3: boolean | undefined = false;

    option4: boolean | undefined = false;

    option5: boolean | undefined = false;

    option6: boolean | undefined = false;

    option7: boolean | undefined = false;

    option8: boolean | undefined = false;

    option9: boolean | undefined = false;

    option10: boolean | undefined = false;
}
