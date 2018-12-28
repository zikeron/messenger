import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string;
  constructor(private userService: UserService) {
    this.friends = userService.getFriends();
  }

  ngOnInit() {
  }

}
