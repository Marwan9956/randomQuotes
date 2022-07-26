import { Component } from '@angular/core';
import { QuoteComponent } from './quote/quote.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'randomQuote';
  quoteChange(event:any) : void{
    //console.log("Hi we get the call body");
  }
}
