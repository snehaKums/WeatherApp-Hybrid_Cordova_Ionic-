import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import  {DataProvider} from '../data/data';

@Injectable()
export class WeatherProvider {
  private toadds=[];
  apikey='be4069c60a794738ab6100859191503 ';
  url='';

  constructor(public http: Http,private dataProvider:DataProvider ) {
    console.log('Hello WeatherProvider Provider');
    this.url='https://api.apixu.com/v1/current.json?key=be4069c60a794738ab6100859191503&q=';
  }
    getWeather(name , country)
    {
      return this.http.get(this.url+name)
      .map(res => res.json());
    }
    addWeather(name , city ,country)
    {
      //this.toadds.push(toaddText,toaddCity,toaddCountry);
      let obj1 = {name , city ,country};
    this.toadds.push(obj1);
    }
    editWeather(name, city, country, todoIndex){
      let obj1 = {name , city ,country};
      this.toadds[todoIndex]= obj1;
    }
    deleteList(addIndex)
    {
      //let todoToBeArchived =  this.todos[addIndex];
      this.toadds.splice(addIndex, 1);
    }
    getList(){
      return this.toadds;
 }
}