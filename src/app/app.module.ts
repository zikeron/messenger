import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ConversationComponent} from './conversation/conversation.component';
import {ProfileComponent} from './profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {SearchPipe} from './pipes/search';
import {FormsModule} from '@angular/forms';
import {environment} from '../environments/environment.prod';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AuthenticationGuard} from './services/authentication.guard';
import { ImageCropperModule } from 'ngx-image-cropper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import {RequestsService} from './services/requests.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'conversation/:uid', component: ConversationComponent},
  {path: 'profile', component: ProfileComponent},

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule,
    BootstrapModalModule.forRoot({container: document.body})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RequestComponent]
})
export class AppModule {
}
