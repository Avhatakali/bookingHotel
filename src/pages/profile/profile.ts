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
  userId = this.navParams.get('userIdentification');

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController) {

      
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          
          console.log(' User is signed in. '+uid)
        } else {
          // User is signed out.
      console.log('User is signed out')
        }
      });

      this.bookingArr = [];

        let ref = firebase.database().ref('booking');
        ref.once("value").then((snapshot) => {
          //getting the user keys
          let users = snapshot.val();
          users = Object.keys(users);
     
          for(let i = 0; i < users.length; i++){
            let bookingValues = snapshot.child(users[i]).val();
            let bookingKeys = Object.keys(bookingValues);
            console.log(bookingKeys.length);

            for(let j = 0; j < bookingKeys.length; j++){
              let booking = snapshot.child(users[i]+'/'+bookingKeys[j]).val();
              let bookingObj = {
                userid: users[i],
                name: booking.Name,
                surname: booking.Surname,
              }
    
              this.bookingArr.push(bookingObj);
              console.log(this.bookingArr);
            }
          }
          })

    //   firebase.database().ref('booking/').on('value', (data: any) => {

    //     var dt = data.val();
    //     console.log(dt);
   
    //     var keys: any = Object.keys(dt);
    //     console.log(keys);
    //     for (var i = 0; i < keys.length; i++) {
    //       var k = keys[i];
    //       console.log(k);
   
    //         for (var e = 0; e < k.length; e++){
    //         var t = this.bookingArr[e];
    //         console.log(t);
    //         break;
    //         }

    //       let obj = {
    //         key: dt.k,
    //         Name: dt[k].Name,
    //         Surname: dt[k].Surname,
    //       }
    //       this.bookingArr.push(obj);
    //       console.log(this.bookingArr); 
    //     };
    // })  
    
    // console.log(this.userId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

    
  Del(v){
    this.bookingArr = [];
    firebase.database().ref('booking/'+this.userId).child(v).remove();
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

                firebase.database().ref('booking/'+this.userId).child(v).update(updates);
                console.log('Save Clicked'+ data.Name);
            // this.navCtrl.setRoot(ProfilePage);    
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
