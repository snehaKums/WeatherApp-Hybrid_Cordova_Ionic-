import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import {Storage} from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-favorite-list',
  templateUrl: 'favorite-list.html',
})
export class FavoriteListPage {
  weather:any;
  location:{
    name:string,
    country:string
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,private weatherProvider:WeatherProvider,private storage:Storage) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoriteListPage');
    this.storage.get('location').then((val)=>{
      if(val != null){
       this.location= JSON.parse(val);
      }
      else {
        this.location={
          name:'Mumbai',
          country:'India'
        }

      }
      this.weatherProvider. getWeather(this.location.name, this.location.country)
          .subscribe(weather => {
             console.log(weather);
                  this.weather=weather;
     });
    });
  }

}
