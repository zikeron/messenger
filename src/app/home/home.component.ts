import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      console.table(data);
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logOut().then(() => {
      alert('Session has closed successfully');
      this.router.navigate(['login']);
    }).catch((error) => {
      console.log(error);
    });
  }
}
