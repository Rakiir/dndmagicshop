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
  welcomeMessage;
  
  constructor(
    private cartService: CartService) {
      this.randomStatBlock();
    }

  initiateOpenStore = function() {
    //window.alert("initiateOpenStore()");
    this.randomStatBlock();
    this.welcomeMsg();
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

   welcomeMsg() {
    var shopPhrase = [
      "Hello adventurers!  Please browse my wares and let me know if you have any questions!",
      "Some people call this junk.  Me?  I call it treasure.",
      "Looking to protect yourself?  Or deal some damage?",
      "So, you wish to master the arcane arts?",
      "Magic.  That's what they always want.  Never history.  Never the secrets of the lost races.  No, just little spells and enchantments.",
      "You approach as if you know us, stranger.  Who are you and what do you want?",
      "I'd even buy one of your relatives, if you're looking to sell!  Ha ha ha...  That's a little joke.",
      "Rare trinkets and the finest oddities from all over!  If there is anything you would like to purchase, let me know.",
      "Warm sands, friend.  How may I serve you?",
      "There's a tranquility in magic, don't you think? It is simply energy, to be harnessed by those with the will and knowledge to do so.",
      "By the Nine!  Are you... who I think you are?!",
      "I have the finest goods anywhere!  Can I interest you in a stamina potion maybe?  Very popular with the young men.",
      "Khajiit has wares, if you have coin.",
      "I would just like to remind everyone, once again, that Restoration is indeed a valid school of magic. It is absolutely worthy of research, despite many of the notes I've had left in my bed. And my desk. And on occasion, my meals. Anyone suggesting that Restoration is better left to the priests of the Temples, I think, is forgetting a few things. I truly hope that more care and thought is given to this subject in the future.  Thank you.",
      "You lot better not be thinking of theiving from me!",
      "You try an take anythin' without payin' and I'll have the town guard in 'ere faster than a gnome's uncle!",
      "Welcome!  Feel free to browse my mystic items!  But try stealing from me and you'll end up just as dead as the last bugger who tried!",
    ];
    var random = Math.floor(Math.random() * shopPhrase.length);
    var outputPhrase = shopPhrase[random];
    //window.alert(outputPhrase);
    this.welcomeMessage = outputPhrase;
  }

  ngOnInit() {
    this.randomStatBlock();
    this.welcomeMsg();
  }

}
