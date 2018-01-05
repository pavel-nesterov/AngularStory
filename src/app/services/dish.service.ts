import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';
import {Http, Response} from '@angular/http';
import {baseURL} from '../shared/baseurl';
import { ProcessHTTPMsgService} from './process-httpmsg.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/catch';

@Injectable()
export class DishService {

  constructor(private http: Http, 
  private processHTTPMessageService: ProcessHTTPMsgService) { }
    
  getDishes(): Observable<Dish[]> {
//    return Observable.of(DISHES).delay(2000);
      return this.http.get(baseURL + 'dishes').map(res => {return this.processHTTPMessageService.extractData(res)});
  }

  getDish(id: number): Observable<Dish> {
    //return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
    return this.http.get(baseURL + 'dishes').map(res => {return this.processHTTPMessageService.extractData(res);});
  }

  getDishIds(): Observable<number[]> {
   // return Observable.of(DISHES.map(dish => dish.id ));
   return this.getDishes()
    .map(dishes => { return dishes.map(dish => dish.id) });
    }
//why do I need map operator twice here?

  getFeaturedDish(): Observable<Dish> {
 //   return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
 return this.http.get(baseURL + 'dishes?featured=true').map(res => {return this.processHTTPMessageService.extractData(res);});
  }}