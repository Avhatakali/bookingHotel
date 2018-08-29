import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { BookingPage } from '../booking/booking';

declare var firebase;

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

      console.log(this.usersArr, this.userid);

      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          // User is signed in.
          var Name = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          console.log(uid +'logged-in !'+ Name);
          
        } else {
          console.log('Not logged in !');
        }
      });
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

  profile(){
    this.navCtrl.setRoot(BookingPage);
  }
}
