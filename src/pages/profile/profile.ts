import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {AlertController} from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';
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

      // this.bookingArr = [];

      firebase.database().ref('booking/'+this.userid).on('value', (data: any) => {

        var dt = data.val();
        console.log(dt);
   
        var keys: any = Object.keys(dt);
   
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
   
          let obj = {
            Name: dt[k].Name,
            surname: dt[k].Surname,
            Email: dt[k].Email,
            Contact: dt[k].Contact,

            key: k
          }
          this.bookingArr.push(obj);
          console.log(this.bookingArr);
        };
    })  
    
    console.log(this.userid);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

    
  Del(v){
    this.bookingArr = [];
    firebase.database().ref('booking/'+this.userid).child(v).remove();
  }

  update(v){

  //   for(let index = 0; index < this.bookingArr.length; index++){
  //     var Name = this.bookingArr[index].Name;
  //     var Surname = this.bookingArr[index].Surname;
  //     var username = this.bookingArr[index].Contact;
  //     var role = this.bookingArr[index].Email;
  //     var id =  this.bookingArr[index].Address;
  //     var password =  this.bookingArr[index].Children;

  // }

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
        text: 'update',
        handler: data => {
                this.bookingArr = [];
                console.log(data.Name);
                console.log(v);

                let updates = { Name:data.Name};
                this.bookingArr.push(updates);

                firebase.database().ref('booking/').child(v).update(updates);
                console.log('Save Clicked'+ data.Name);
            this.navCtrl.setRoot(ProfilePage);    
          }
      },
      {
        text: 'cancel',
        handler: data => {
              console.log('cancel clicked');                            
            }
          }
      ]
  });
  alert.present();
  }

  logout(){

  }

  rooms(){
   this.navCtrl.setRoot(RoomsPage); 
  }

}
