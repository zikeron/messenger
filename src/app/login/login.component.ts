import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  operation = 'login';
  email: string = null;
  password: string = null;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then((data) => {
        alert('Login succesfully');
        console.log(data);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        if (error.code) {
          alert('Sorry something went wrong');
          console.log(error.code);
        }
      });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then((data) => {
        alert('Registered succesfully');
        console.log(data);
      })
      .catch((error) => {
        if (error.code){
          alert(error.message);
        }
      });
  }
}


