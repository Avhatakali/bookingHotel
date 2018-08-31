import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RoomsPage } from '../rooms/rooms';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';

declare var firebase;

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  usersArr = new Array();
  userid = this.navParams.get('userIdentification');

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController){
      this.usersArr = [];

      firebase.database().ref('users').on('value', (data: any) => {

        var username = data.val();
        console.log(username);
   
        var keys: any = Object.keys(username);
   
        for (var i = 0; i < keys.length; i++) {
          var k = keys[i];
   
          let obj = {
            item: username[k].name,
            key: k
          }
          this.usersArr.push(obj);
          console.log(this.usersArr);
        };
    })
}

  getData(data) {
    console.log(data.val());

    var users = data.val();
    var keys = Object.keys(users);
    console.log(keys);

    for(var i = 0; i < keys.length; i++ ){
      var k = keys[i];
      var name = users[k].name;
      var surname = users[k].surname;
      var email = users[k].email;
      var password = users[k].password;
      console.log(name,surname,email,password);
    }
  }

  errData(err) {
  console.log('Error!');
  console.log(err);
}  

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

    register(name,surname,email,password){
      
      if(name != '' && name != null && surname != '' && surname != null && email != '' && email != null && password != '' && name != null){
        firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{

        var userid = firebase.auth().currentUser;
          if(userid != null){
            firebase.database().ref('users/'+ this.userid).push({
              name: name,
              surname: surname,
            });
          }else{
           alert('not created');
          }
      })
        const prompt = this.alertCtrl.create({
          title: 'Sign up',
          message: "you succefully sign up !",
          
          buttons: [
            {
              text: 'OK',
              handler: data => {
                console.log('Saved clicked');
                this.navCtrl.push(RoomsPage);
              }
            }
          ]
        });
        prompt.present(); 

      }else{
        
        const prompt = this.alertCtrl.create({
          title: 'Sign up',
          message: "Enter sign up details !",

        buttons: [
          {
            text: 'OK',
            handler: data => {
              console.log('Saved clicked');
              this.navCtrl.setRoot(SignupPage);
            }
          }
        ]
      });
      prompt.present(); 
    }
  } 

    rooms(){
      this.navCtrl.setRoot(RoomsPage);
    }

    login(){
      this.navCtrl.setRoot(LoginPage);
    }
}
