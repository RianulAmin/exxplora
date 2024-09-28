import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrl: './profile-setup.component.css'
})
export class ProfileSetupComponent {

  profileForm!: FormGroup;
  active: number = 0;
  location: string = '';
  organization: string = '';
  institution: string = '';
  startYear: string = '';
  endYear: string = '';

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

  isStudent: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      location: ['', Validators.required],  
      organization: ['', this.organizationValidator.bind(this)],  
      institution: ['', this.institutionValidator.bind(this)], 
      startYear: [''],
      endYear: [''],
    });
  }

  organizationValidator(control: any) {
    if (!this.isStudent && !control.value) {
      return { required: true };
    }
    return null;
  }

  institutionValidator(control: any) {
    if (this.isStudent && !control.value) {
      return { required: true };
    }
    return null;
  }

  setStudentStatus(status: boolean): void {
    this.isStudent = status;
    this.profileForm.get('organization')?.updateValueAndValidity();
    this.profileForm.get('institution')?.updateValueAndValidity();
    this.profileForm.get('startYear')?.updateValueAndValidity();
  }

  onProfilePicSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log("Profile picture selected:", file);
    }
  }

  onCoverPicSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      console.log("Cover photo selected:", file);
    }
  }

  onSubmitStep1(step1Form: any) {
    if (step1Form.valid) {
      console.log('Form is valid, moving to the next step');
      this.active += 1;
    } else {
      console.log('Form is invalid');
    }
  }

  onNext(): void {
    if (this.profileForm.valid) {
      console.log('Form is valid, proceed to next step.');
    } else {
      console.log('Form is invalid, please correct the errors.');
    }
  }
}
