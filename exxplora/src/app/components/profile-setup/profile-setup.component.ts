import { ProfileSetupService } from './../../services/profile-setup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Domain } from '../../interfaces/domain';
import { DomainService } from '../../services/domain.service';
import { ProfileSetup } from '../../interfaces/profile-setup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.css']
})
export class ProfileSetupComponent implements OnInit {

  profileForm!: FormGroup;
  active: number = 0;

  profileSetupInfos: ProfileSetup = {
    location: '',
    institution: '',
    startYear: 0,
    endYear: 0,
    isStudent: false,
    domains: [],
    profile: undefined,
    cover: undefined
  };

  startYear: Date = new Date()
  endYear: Date = new Date()

  domains: Domain[] = [];

  constructor(private fb: FormBuilder, private domainService: DomainService, private profileSetupService: ProfileSetupService, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      location: ['', Validators.required],
      organization: ['', this.organizationValidator.bind(this)],
      institution: ['', this.institutionValidator.bind(this)],
      startYear: [''],
      endYear: [''],
    });

    // Fetch the domains from the service
    this.domainService.getAllDomains().subscribe(
      res => {
        this.domains = res.Data;
      },
      error => {
        console.error('Error:', error);
        alert("Failed to fetch domains");
      }
    )
  }

  organizationValidator(control: any) {
    if (!this.profileSetupInfos.isStudent && !control.value) {
      return { required: true };
    }
    return null;
  }

  institutionValidator(control: any) {
    if (this.profileSetupInfos.isStudent && !control.value) {
      return { required: true };
    }
    return null;
  }

  setStudentStatus(status: boolean): void {
    this.profileSetupInfos.isStudent = status;
    this.profileForm.get('organization')?.updateValueAndValidity();
    this.profileForm.get('institution')?.updateValueAndValidity();
    this.profileForm.get('startYear')?.updateValueAndValidity();
  }

  toggleDomainSelection(domainId: number): void {
    const index = this.profileSetupInfos.domains.indexOf(domainId);
    if (index > -1) {
      // If domain is already selected, remove it from the array
      this.profileSetupInfos.domains.splice(index, 1);
    } else {
      // If domain is not selected, add it to the array
      this.profileSetupInfos.domains.push(domainId);
    }
  }

  isDomainSelected(domainId: number): boolean {
    return this.profileSetupInfos.domains.includes(domainId);
  }

  onProfilePicSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileSetupInfos.profile = file;
      console.log("Profile picture selected:", file);
    }
  }

  onCoverPicSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileSetupInfos.cover = file;
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

  handleSubmit() {
    console.log(this.startYear.getFullYear())
    console.log(this.endYear.getFullYear())
    console.log(this.profileSetupInfos);



    if (this.profileSetupInfos.isStudent) {
      this.profileSetupInfos.startYear = this.startYear.getFullYear();
      this.profileSetupInfos.endYear = this.endYear.getFullYear();
    }
    else {
      this.profileSetupInfos.startYear = 0;
      this.profileSetupInfos.endYear = 0;
    }

    this.profileSetupService.setupProfileInfo(this.profileSetupInfos).subscribe(
      (res) => {
        if (!res.IsError) {
          if(this.profileSetupInfos.profile){
            this.profileSetupService.setupProfilePhoto(this.profileSetupInfos.profile).subscribe(
              res => {
                if (!res.IsError) {
                  if(this.profileSetupInfos.cover){
                    this.profileSetupService.setupCoverPhoto(this.profileSetupInfos.cover).subscribe(
                      res => {
                        if (!res.IsError) {
                          this.router.navigate([''])
                        }
                        else alert("Cover photo failed to upload \n" + res.Messages )
                      }
                    )
                  }
                }
                else alert("photo failed to upload \n" + res.Messages )
              }
            )
          }
        }
        else alert("Failed to update");
      },
      err => {
        console.log(err);
      }
    )
  }
}
