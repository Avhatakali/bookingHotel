import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { RoomsPage } from '../rooms/rooms';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

  }

login(){
  this.navCtrl.setRoot(LoginPage);
} 

signup(){
  this.navCtrl.setRoot(SignupPage);
}

rooms(){
  this.navCtrl.setRoot(RoomsPage);
}

profile(){
  this.navCtrl.setRoot(ProfilePage);
}

}
