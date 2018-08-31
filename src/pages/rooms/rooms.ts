import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { BookingPage } from '../booking/booking';
import { ProfilePage } from '../profile/profile';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController){

      console.log(this.usersArr, this.userid);

      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          // User is signed in.
          var Name = user.displayName;
          var email = user.email;
          var photoURL = user.photoURL;
          var uid = user.uid;
          
          console.log(uid +'logged-in !'+ email);
          
        } else {
          const alert = this.alertCtrl.create({
            title: ' Not logged in ! ',
            subTitle: 'To book you must login or sign-up',
            buttons: ['OK']
          });
          alert.present();    
        }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomsPage');
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  signup(){
    this.navCtrl.setRoot(SignupPage);
  }

  book(){
    this.navCtrl.setRoot(BookingPage,{userid:this.userid});
  }

  price(){
    this.navCtrl.setRoot(BookingPage,{userid:this.userid});
  }

  profile(){
  this.navCtrl.setRoot(ProfilePage,{userid:this.userid});
  }
}
