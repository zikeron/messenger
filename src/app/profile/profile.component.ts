import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe(
      (status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe(
        (data: User) => {
          this.user = data;
          console.log(this.user);
        },
        (error) => {
        console.log(error);
      });
      },
      (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }
  saveSettings() {
    this.userService.editUser(this.user).then(() => {
      alert('Changes saved');
    })
      .catch((error) => {
        alert(Error);
      });
  }
}
