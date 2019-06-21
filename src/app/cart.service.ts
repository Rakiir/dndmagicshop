import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductListComponent } from './product-list/product-list.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items;
  private pList = new Subject<ProductListComponent>(); //Subject<any>();
  componentMethodCalled$ = this.pList.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  topBarCall() {
    this.pList.next();
    // window.alert("SERVICE:  topBarCall()");
  }
}