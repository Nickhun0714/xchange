import { Component, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { WebSocketService } from './service/web-socket.service';
import { ConfigService } from './service/config.service'
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})

@Injectable()
export class AppComponent {
  messageFromServer: string = ""
  wsSubscription: Subscription | any;
  status : any;
  amount: number | any;

  myControl = new FormControl('');
  options: string[] = [''];
  filteredOptions: Observable<string[]> | any;

  myControlTo = new FormControl('');
  optionsTo: string[] = [''];
  filteredOptionsTo: Observable<string[]> | any;

  fromValue='';
  toValue='';
  amountValue='';
  result='';


  // stockPrice: any;
  // selectedStock='';
  // optionsStock: string[] = [''];
  // filteredOptionsStock: Observable<string[]> | any;
  // stocks : string[] = [''];


  constructor(private wsService: WebSocketService, private configService: ConfigService){
    // this.wsSubscription = this.wsService.createObservableSocket('wss://stream.binance.com:9443/ws/eurusdt@trade')
    // .subscribe(
    //   (data)=>{
    //     this.stockPrice = data ? JSON.parse(data).p : 'connection lost'        
    //   }
    // )
  }

  closeSocket(){
    this.wsSubscription.unsubscribe();
  }


  ngOnInit(){
    this.configService.sendGetRequest().subscribe((data: any)=>{
      console.log(Object.keys(data.rates));
      this.options=Object.keys(data.rates);
      this.optionsTo = Object.keys(data.rates);
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
      this.filteredOptionsTo = this.myControlTo.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    })  


    //this.configService.getStock().subscribe((data:any)=>{

      // for(const tmp of data.values()){
      //   console.log(tmp['symbol'])
      //   this.optionsStock.push(tmp['symbol'].toString())
      // }

      // this.filteredOptionsStock = this.myControlStock.valueChanges.pipe(
      //   startWith(''),
      //   map(value=>this._filter(value || '')),
      // );

      // this.optionsStock = Object.values(data)[4]
    //   console.log()
    //   data.symbols.filter((e:string)=>
    //  {
    //   if(Object.values(e)[1].includes('BREAK')){
    //  this.stocks.push(Object.values(e)[0].toString())
    //   }
    //   } )
    //   this.myControlStock.valueChanges.pipe(
    //     startWith(''),
    //     map(value=>this._filter(value || '')),
    //   );



    //})


  }

  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  exchangeCurrency(){
    this.configService.sendGetChange(this.fromValue,this.toValue,this.amountValue).subscribe((data: any)=>{
      this.result = data.result;
    })
  }

}
