import { Component } from '@angular/core';
import { NavController,AlertController,reorderArray,ToastController } from 'ionic-angular';
import {WeatherProvider} from '../../providers/weather/weather';
import { FavoriteListPage } from '../favorite-list/favorite-list';


@Component({
  selector: 'page-about',
  templateUrl: 'list.html'
})
export class ListPage {
  public toadds=[];
  public reorderIsEnabled=false;

  constructor(public navCtrl: NavController,private toastController: ToastController, private alertController:AlertController, private weatherProvider:WeatherProvider) {
    this.toadds= this.weatherProvider.getList();
  }
  toggleReorder(){
    this.reorderIsEnabled=!this.reorderIsEnabled;
  }

  itemReordered($event){
    reorderArray(this.toadds,$event);
  }
  editWeather(todoIndex){
    let editWeatherAlert = this.alertController.create({
      title:"Edit Friends Details",
  		message:"Edit your friend name and place",
  		inputs:[
        {
          type:"text",
          name:"editName",
          placeholder:"enter your friend name"
        },{
          type:"text",
          name:"editCity",
          placeholder:"enter city"
        },
        {
          type:"text",
          name:"editCountry",
          placeholder:"enter country"
        }
      ],
  		buttons:[
  		{
  			text:"Cancel"
  		},
     
      
      {
        text:"edit",
        handler:(inputData)=>{
          let toeditName,toeditCity, toeditCountry;
          toeditName= inputData.editName;
          toeditCity= inputData.editCity;
          toeditCountry= inputData.editTime;
          this.weatherProvider.editWeather(toeditName,toeditCity, toeditCountry,todoIndex);
          editWeatherAlert.onDidDismiss(()=> {
            let editTodoToast= this.toastController.create({
            message:"Todo is edited",
            duration: 2000
          });
          editTodoToast.present();
          });

          
        }

      }]
    });
    editWeatherAlert.present()
  }
  openToaddAlert(){
    let addToaddAlert=this.alertController.create({
      title:"Add Friends",
      message:"Enter your friend name and palce",
      
     
      inputs:[
        {
          type:"text",
          name:"addName",
          placeholder:"enter your friend name"
        },{
          type:"text",
          name:"city",
          placeholder:"enter city"
        },
        {
          type:"text",
          name:"country",
          placeholder:"enter country"
        }
      ],
        buttons:[
          {
            text:"Cancel"
          },
          {
            text:"Add",
            handler:(inputData)=>{
            let toaddText, toaddCity, toaddCountry;
            toaddText=inputData.addName;
            toaddCity=inputData.city;
            toaddCountry=inputData.country;

            this.weatherProvider.addWeather(toaddText,toaddCity, toaddCountry);
            addToaddAlert.onDidDismiss(()=> {
            let addTodoToast= this.toastController.create({
            message:"Friend is added successfully!!!",
            duration: 2000
             });
          addTodoToast.present();
        });
          
      }
     
     
    }]
  });
  addToaddAlert.present();

}

   deleteList(addIndex){
    this.weatherProvider.deleteList(addIndex);
    let editTodoToast = this.toastController.create({
      message : "Friend has been deleted successfully!",
      duration : 2000
    });
    editTodoToast.present();
  }
  favoriteList()
  {
    this.navCtrl.push(FavoriteListPage);
  }
}
