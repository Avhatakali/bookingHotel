import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { BookingPage } from '../booking/booking';

/**
 * Generated class for the RoomsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html',
})
export class RoomsPage {

  usersArr = new Array();
  userid = this.navParams.get('userIdentification');
  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
  }

  login(){
    this.navCtrl.setRoot(LoginPage);
  }

  signup(){
    this.navCtrl.setRoot(SignupPage);
  }

  book(){
    this.navCtrl.setRoot(BookingPage);
  }

  price(){
    this.navCtrl.setRoot(BookingPage);
  }
}
