import { Component, OnInit } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  shopOwnerStatBlock;
  statBlockList;
  
  constructor(
    private cartService: CartService) {
      this.randomStatBlock();
    }

  initiateOpenStore = function() {
    //window.alert("initiateOpenStore()");
    this.randomStatBlock();
    this.cartService.topBarCall();
  }

  randomStatBlock() {
    this.statBlockList = [
      "https://www.dndbeyond.com/monsters/guard",
      "https://www.dndbeyond.com/monsters/acolyte",
      "https://www.dndbeyond.com/monsters/mage",
      "https://www.dndbeyond.com/monsters/knight",
      "https://www.dndbeyond.com/monsters/commoner",
    ];
    var random = Math.floor(Math.random() * this.statBlockList.length);
    this.shopOwnerStatBlock = this.statBlockList[random];
    console.log(this.shopOwnerStatBlock);
  }



  ngOnInit() {
    this.randomStatBlock();
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
