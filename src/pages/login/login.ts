import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { RoomsPage } from '../rooms/rooms';
import { LoadingController } from 'ionic-angular';

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
    public navParams: NavParams,
    public loadingCtrl: LoadingController){

      console.log(this.usersArr, this.userid);

      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Not logged in')
      }).catch(function(error) {
        // An error happened.
        console.log('sign out error');
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

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();

    // var userid= firebase.auth().currentUser.uid;
    try {
      
      //sign in
      firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
  
      // this.navCtrl.setRoot(RoomsPage, {userid:userid});
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
