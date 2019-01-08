import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {RequestsService} from '../services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  friends: User[];
  query: string = '';
  friendEmail = '';
  user: User;
  closeResult: string;
  message: string;
  
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private modalService: NgbModal,
    private requestService: RequestsService) {
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      // console.log(data);
      this.friends = data;
    }, (error) => {
      console.log(error);
    });
    this.authenticationService.getStatus().subscribe((staus) => {
      this.userService.getUserById(staus.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
          console.log(this.user);
        }
      });
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending',
      receiver_msg: this.message
    };
    this.requestService.createRequest(request)
      .then(() => {
        alert('Solicitud enviada con éxito');
      })
      .catch((err) => {
        alert('Ups! ha ocurrido un error, por favor intente más tarde.');
        console.log(err);
      });
  }
}
