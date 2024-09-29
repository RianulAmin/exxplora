import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { GetInfo } from '../../interfaces/get-info';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent implements OnInit {
  constructor (private userService:  UserService) {}

  userDetails: GetInfo = {
    Id: 0, 
    FirstName: '',
    LastName: '',
    OrganizationName: '',
    Location: '',
    ProfilePicUrl: '',
    CoverPicUrl: ''
  };


  ngOnInit(): void {
    this.userService.getUserData().subscribe(
      res => {
        console.log(res);
        if(!res.IsError){
          this.userDetails = res.Data;
        }
        else alert("Failed to load")
      },
      err => {
        alert("Failed to load")
      }
    )
  } 
}
