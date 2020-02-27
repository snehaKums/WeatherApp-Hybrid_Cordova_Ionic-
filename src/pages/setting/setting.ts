import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  city:string;
  country: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
     this.storage.get('location').then((val) =>{
       if(val != null)
       {
         let location = JSON.parse(val);
          this.city=location.city;
          this.country=location.country;
       }
       else
       {
          this.city= 'Mumbai';
          this.country='India';
       }
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');

  }
    saveForm()
      {
                let location = {
                    name: this.city,
                    country: this.country
                }
                 console.log(location);
                this.storage.set('location', JSON.stringify(location));
                 this.navCtrl.push(HomePage);
      }
    
}
