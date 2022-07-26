import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotesServiceService {
  private url : string ;
  data : any[];
  constructor(private http:HttpClient) { 
    this.url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
    //this.url = "https://marwansaleh.com/quotes/quotes.json";
    this.data = [];
  }
  
  getQuotes() : Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }
}


