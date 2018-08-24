import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item } from 'ionic-angular';
import {AlertController} from 'ionic-angular';
declare var firebase;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  bookingArr = new Array();
  userid = this.navParams.get('userIdentification');

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {

      this.bookingArr = [];

      firebase.database().ref('booking').on('value', (data: any) => {

        var name = data.val();
        console.log(name);
   
        var keys: any = Object.keys(name);
   
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
   
          let obj = {
            item: name[k].Name,
            key: k
          }
          this.bookingArr.push(obj);
          console.log(this.bookingArr);
        };
    })      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

    
  Del(v){
    this.bookingArr = [];
    firebase.database().ref('booking/').child(v).remove();
  }

  update(u){

    for(let index = 0; index < this.bookingArr.length; index++){
      var Name = this.bookingArr[index].Name;
      var Surname = this.bookingArr[index].Surname;
      var username = this.bookingArr[index].Contact;
      var role = this.bookingArr[index].Email;
      var id =  this.bookingArr[index].Address;
      var password =  this.bookingArr[index].Children;

  }

  let alert = this.alertCtrl.create({
    title: 'Update',
    inputs: [
      {
        name: 'Name',
        placeholder: 'name',
      },
      {
        name: 'Surname',
        placeholder: 'surname',
    
      },
      {
        name: 'role',
        placeholder: 'role',
      },
      {
        name: 'id',
        placeholder: 'id',
      },

      {
        name: 'username',
        placeholder: 'username',
      },
      {
        name: 'password',
        placeholder: 'password',
      },
   
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
        
          const prompt = this.alertCtrl.create({
            title: 'successful',
            message: "canceled update !",
  
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
      },
      {
        text: 'Update',
        handler: data => {
      
        const prompt = this.alertCtrl.create({
          title: 'successful',
          message: " your booking details have being updated !",

        buttons: [
          {
            text: 'OK',
            handler: data => {
              this.bookingArr = [];
              var updates = { Name:data.Name};
              firebase.database().ref('booking/').child(u).update(updates);
              this.navCtrl.setRoot(ProfilePage);
            }
          }
        ]
      });
      prompt.present()
        }
      }   
    ]
  });
  alert.present();
  }

}
