import { Component } from '@angular/core';
import { Spells } from '../spells';
import { AdjectiveList } from '../spells';
import { TypeOfItem } from '../spells';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  spellList = Spells;
  adjectives = AdjectiveList;
  itemType = TypeOfItem;
  shopProducts = [];
  welcomeMessage;
  //private cartService: CartService;

  constructor (
    private route: ActivatedRoute,
    private cartService: CartService) {
            this.cartService.componentMethodCalled$.subscribe(
                () => {
                  this.openStore();
                }
            );
    }


  ngOnInit() {
    this.openStore();
  }

/**
 * Requied for componentMethodCalled$ to function properly.
 * Needs to be named next() because that is what Subject looks for.
 */
  next() {
    this.openStore();
  }

  spellLevelOdds = [
    {rollcap:10,spellLevel:0},
    {rollcap:25,spellLevel:1},
    {rollcap:40,spellLevel:2},
    {rollcap:55,spellLevel:3},
    {rollcap:70,spellLevel:4},
    {rollcap:85,spellLevel:5},
    {rollcap:90,spellLevel:6},
    {rollcap:95,spellLevel:7},
    {rollcap:98,spellLevel:8},
    {rollcap:100,spellLevel:9}];

  adjLength = this.adjectives.length;
  itemTypeLength = this.itemType.length;
  spellLength = this.spellList.length;
  spellSubset;
  subsetLength;


/**
 * Returns the spell level as an int 0-9.
 * Min & Max are the spell level ranges.
 */
  randomSpellLevel(min, max) {
    window.alert("randomSpellLevel(min, max)");
    var levelOddsRandom;
    levelOddsRandom = Math.floor((Math.random() * this.spellLevelOdds[max].rollcap) + this.spellLevelOdds[min].rollcap);
window.alert("Random: " + levelOddsRandom);
    for (var x in this.spellLevelOdds) {
      if (this.spellLevelOdds[x].rollcap >= levelOddsRandom){
			  return(this.spellLevelOdds[x].spellLevel);
		  }
    }
  }

/**
 * Returns the specific spell the item will be enchanted with.
 * Takes min adn max as the minimum and maximum spell level values.
 * Returns spellTemplate as a spell item containing the spell's statistics.
 */
  getSpell(min, max) {

    var randomSpell = Math.floor((Math.random() * this.spellLength) +1);
    if (this.spellList[randomSpell].level >= min && this.spellList[randomSpell].level <= max) {
      var spellTemplate = {name:'', level:0, casthigherflag:0, dcflag:0, attackflag:0, pagenumber:0};
      spellTemplate.name = this.spellList[randomSpell].name;
      spellTemplate.level = this.spellList[randomSpell].level;
      spellTemplate.casthigherflag = this.spellList[randomSpell].casthigherflag;
      spellTemplate.dcflag = this.spellList[randomSpell].dcflag;
      spellTemplate.attackflag = this.spellList[randomSpell].attackflag;
      spellTemplate.pagenumber = this.spellList[randomSpell].pagenumber;
      return(spellTemplate);
    } else {
      return(this.getSpell(min, max));
    }
  }

/**
 * Return a random adjective from the list of adjectives as a string.
 */
  randomAdjective() {
    var adjectiveRandom;
    adjectiveRandom = Math.floor((Math.random() * this.adjLength));
    //window.alert("randomAdjective() " + this.adjective[adjectiveRandom]);
    return(this.adjectives[adjectiveRandom]);
  }
  
  /**
   * Return an random item type from the list of itemTypes as a string.
   */
  randomItemType() {
    var itemTypeRandom;
    itemTypeRandom = Math.floor((Math.random() * this.itemTypeLength));
    //window.alert("randomItemType() " + this.itemType[itemTypeRandom]);
    return(this.itemType[itemTypeRandom]);
  }

  /**
   * Create a single magic item with a name, spell level, and spell on it.
   */
  generateItem(min, max) {
    var adj = this.randomAdjective();
    var itemType = this.randomItemType();
    var itemSpell = this.getSpell(min, max);
    var saveDC;
    if (itemSpell.dcflag == 1) {
      //SOURCE:  https://www.enworld.org/forum/attachment.php?s=f2f583931c5f603cfd85bc056a778c96&attachmentid=72985&d=1452417049
      if (itemSpell.level <= 2) {
        saveDC = 13;
      }
      else if (itemSpell.level == 3 || itemSpell.level == 4) {
        saveDC = 15;
      } 
      else if (itemSpell.level == 5 || itemSpell.level == 6) {
        saveDC = 17;
      }
      else if (itemSpell.level == 7 || itemSpell.level == 8) {
        saveDC = 18;
      }
      else {
        saveDC = 19;
      }
    }
    var routerExt = this.routerExtension(itemSpell.name);
    var magicItem = {name: adj + " " + itemType, routerInfo:routerExt, enchantment:itemSpell, saveDC:saveDC};
    //window.alert("Magic Item:  " + magicItem.name + " " + magicItem.enchantment.name);
    return(magicItem);
  }

  reshuffle(productID) {
    var min = document.getElementById("minimum");
    var max = document.getElementById("maximum");
    if (min.value > max.value) {
      window.alert("ERROR:  Minimum Spell Level May Not Exceed Maximum Spell Level!");
    } else {
      var replacementItem = this.generateItem(min.value, max.value);
      this.shopProducts[productID] = replacementItem;
    }
  }

 /**
 * Resets the store array so there are no items in it.
 */
  clearStore() {
    this.shopProducts = [];
  }

  /**
   * Generates 5 completely new items for the store.
   */
  openStore() {
    // window.alert("Open Store");
    var min = document.getElementById("minimum");
    var max = document.getElementById("maximum");
    if (min.value > max.value) {
      window.alert("ERROR:  Minimum Spell Level May Not Exceed Maximum Spell Level!");
    } else {
      this.clearStore();        
      this.welcomeMessage = this.welcomeMsg();
      for (var x=0; x<10; x++) {
        var newItem = this.generateItem(min.value, max.value)
        this.shopProducts.push(newItem);
      }
    }
  }

  routerExtension(spellNameStr) {
    var spellName = spellNameStr;
    var dndbeyond = 'https://dndbeyond.com/spells/';
    var replacedSpace = spellName.split(' ').join('-');
    var replacedQuote = replacedSpace.split("'").join('');
    var replacedSlash = replacedQuote.split("/").join('');
    var route = dndbeyond + replacedSlash;
    //window.alert(route);
    return(route);
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
    return (outputPhrase);
  }

}
