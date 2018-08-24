import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { RoomsPage } from '../rooms/rooms';

declare var firebase;

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signup(){
    this.navCtrl.setRoot(SignupPage);
  }

  rooms(){
    this.navCtrl.setRoot(RoomsPage);
  }

  login(){
    this.navCtrl.setRoot(SignupPage);
  }

  logIn(email,password){
    // const email = email.value;
    // const email = email.value;

    //sign in
    firebase.auth().signInWithEmailAndPassword(email,password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });

      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log(user +'logged-in');
        }else{
          console.log('Not logged in !');
        }
      });
   }
}
