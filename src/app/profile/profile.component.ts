import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {AuthenticationService} from '../services/authentication.service';
import {User} from 'firebase';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe(
      (status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe(
        (data: User) => {
          this.user = data;
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
    if (this.croppedImage) {
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url')
        .then(
          (result) => {
            this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();
            this.picture.subscribe((p) => {
              this.userService.setAvatar(p, this.user.uid)
                .then(() => {
                  alert('Avatar upload successfuly');
                })
                .catch((error) => {
                  alert('Sorry something went wrong');
                  console.log(error);
                });
            });
          }
      )
        .catch(
          (error) => { console.log(error); }
      );
    }
    this.userService.editUser(this.user).then(() => {
      alert('Changes saved');
    })
      .catch((error) => {
        alert(Error);
      });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }
}
