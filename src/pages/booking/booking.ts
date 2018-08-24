import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { RoomsPage } from '../rooms/rooms';

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
    public alertCtrl: AlertController) {
      // alert(this.navParams.get('userIdentification'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  book(Name,surname,email,contact,address,dateIn,dateOut,Rooms,Children,adult){

        if(Name != null && Name != ''){
        var userID = firebase.auth().currentUser.uid;

        firebase.database().ref('booking/').push({
          Name:Name,
          Surname:surname,
          Email:email,
          Contact:contact,
          Address:address,
          CheckIn:dateIn,
          CheckOut:dateOut,
          Room:Rooms,
          Children:Children,
          Adult:adult
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
      prompt.present()
      } else{
        const prompt = this.alertCtrl.create({
          title: 'unsuccessful',
          message: "verify your booking details !",

        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Saved clicked');
              this.navCtrl.setRoot(ProfilePage);
            }
          }
        ]
      });
      prompt.present()
      }
  }
}
