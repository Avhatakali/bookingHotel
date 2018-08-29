import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RoomsPage } from '../rooms/rooms';
import { LoginPage } from '../login/login';

declare var firebase;

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {
  arr = new Array();
  userid = this.navParams.get('userIdentification');

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController){

      firebase.auth().onAuthStateChanged((user)=>{
        if (user){
          // User is signed in.
          var Name = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;

          console.log(uid +'logged-in !'+ Name);
          
        } else{
          console.log('Not logged in !');
        }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  book(Name,surname,email,contact,address,dateIn,dateOut,Rooms,Children,adult){

        if(Name != null && Name != '' && surname != null && surname != '' 
        && email != null && email != '' && contact != null && contact != '' 
        && dateIn != null && dateIn != '' && dateOut != null && dateOut != ''
        && Rooms != null && Rooms != '' && Children != null && Children != '' && adult != null && adult != ''){

          if(dateIn < dateOut){
              console.log('correcct');
              firebase.database().ref('booking/' + userID).push({
                Name:Name,
                Surname:surname,
                Email:email,
                Contact:contact,
                Address:address,
                CheckIn:dateIn,
                CheckOut:dateOut,
                Room:Rooms,
                Children:Children,
                Adult:adult,
              });

              
        const prompt = this.alertCtrl.create({
          title: 'successful',
          message: "thank you for booking into our hotel !",

        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Saved clicked');
              this.navCtrl.setRoot(RoomsPage);
            }
          }
        ]
      });
      prompt.present();
          }else{
            const alert = this.alertCtrl.create({
              title: 'error message !',
              subTitle: 'verify your check-in and check-out dates',
              buttons: ['OK']
            });
            alert.present();
          }

        var userID = firebase.auth().currentUser.uid;

      }else{
        const prompt = this.alertCtrl.create({
          title: 'unsuccessful',
          message: "verify your booking details !",

        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Saved clicked');
              // this.navCtrl.setRoot(ProfilePage);
            }
          }
        ]
      });
      prompt.present()
      }
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  rooms(){

  }

  profile(){
    this.navCtrl.setRoot(ProfilePage);
  }
}
