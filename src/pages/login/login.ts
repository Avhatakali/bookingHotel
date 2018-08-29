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

  
  usersArr = new Array();
  userid = this.navParams.get('userIdentification');
  constructor(public navCtrl: NavController, 
    public navParams: NavParams){

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

    var userID = firebase.auth().currentUser.uid;
    try {
      
      //sign in
      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
  
      this.navCtrl.setRoot(RoomsPage);
      }).catch((error)=>{
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
          if(errorCode == 'auth/wrong-password'){
            alert('Wrong password.'); 
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
    catch(e) {
      console.log(e);
     }
   }
}
