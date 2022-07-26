import { Component, EventEmitter, OnInit , Output } from '@angular/core';
import { QuotesServiceService } from '../services/quotes-service.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  @Output() newQuote : EventEmitter<string> = new EventEmitter<string>();

  quotes : any[];
  curruntIndex : number;
  quote : string;
  author : string;
  oldIndex : number;
  colors : Array<string>;
  allowDisplay : boolean;
  twitterShare : URL;
  tumblarShare : string;

  constructor(private quoteService : QuotesServiceService) {
    this.quote = "";
    this.author = "";
    this.oldIndex = 0;
    this.colors = [
      '#1e81b0',
      '#e28743',
      '#eab676',
      '#21130d',
      '#873e23',
      '#063970',
      '#2f7915'
    ];
    this.quotes = [];
    this.curruntIndex = 0;
    this.allowDisplay = false;
    this.twitterShare = new URL('https://twitter.com/intent/tweet?text=');
    this.tumblarShare = "";
  }

  ngOnInit(): void {
    this.getQuotes();
  }

  /**
   * 
   * @returns boolean
   * method process when user click on new Quote
   * call change color method 
   * @emits newQuote event
   */
  processNewQuote():boolean{
    this.changeColor();
    this.newQuote.emit();
    return false;
  }

  /**
   * 
   * @returns boolean
   * change color of background and text color when user click on new Quote button
   */
  changeColor():boolean{
    let root = document.documentElement;
    let body = document.body.style.backgroundColor;
    let co = getComputedStyle(document.body);
    
    /**
     * Change Color for background and text 
     */
    root.style.setProperty('--main-color' , this.randomColor());
    
    /**
     * Assign next quote
     */
    this.assignQuote();
    this.nextQuote();

    return false;
  }

  /**
   * 
   * @param hex hex value of color 
   * @returns string
   * method to change hex value to rgb value
   */
  hexToRgb(hex : any):string {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    
    var r = parseInt(result![1], 16).toString();
    var b = parseInt(result![2], 16).toString();
    var g = parseInt(result![3], 16).toString();
    return `rgb(${r},${b},${g})`;

  }

  /**
   * 
   * @returns string
   * assign random index to be used to pick color from color array
   */
  randomColor():string{
    let condition = true;
    let result = "";
    let max = this.colors.length;
    let curruntColor = "";
    
    while(condition){
      let index = Math.floor(Math.random() * max);
      curruntColor = this.hexToRgb(this.colors[index])
      
      if(index !== this.oldIndex){
        this.oldIndex = index;
        condition= false;
      }
    }
    
    return curruntColor;
  }

  /**
   * getting data from server with quote service 
   */
  getQuotes():any{
    this.quoteService.getQuotes().subscribe(data => {
      this.quotes =  data;
      for (let key in data) {
        this.quotes = data[key];
        break;
      }
      this.assignQuote();
      this.nextQuote();
      this.allowDisplay = true;
    });
  }

  /**
   * get next quote 
   */
  nextQuote():void{
    this.curruntIndex += 1;
    if(this.curruntIndex == this.quotes.length){
      this.curruntIndex = 0;
    }
  }

  /**
   * Assign quote and autho value to be used in view
   */
  assignQuote():void{
    /**
     * assign quote and author 
     */
     for(let key in this.quotes[this.curruntIndex]){
      if(key == 'quote'){
        this.quote  = this.quotes[this.curruntIndex][key]; 
      }else{
        this.author = this.quotes[this.curruntIndex][key];
      }
    }
    let link = '"' + this.quote + '" ' + this.author;
    this.tumblarShare = "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" + encodeURIComponent(this.author) + '&content=' + encodeURIComponent(this.quote) +
    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';


    this.twitterShare.searchParams.set('text' , link);
     
  }

}
