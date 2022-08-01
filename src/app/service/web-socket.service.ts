import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class WebSocketService {

  constructor(){

  }

  //url  = "ws://stream.binance.com:9443/ws/etheur@trade";
  ws: WebSocket | any

  createObservableSocket(url:string):Observable<any>{
    this.ws = new WebSocket(url);
    return new Observable(
      observer =>{
        this.ws.onmessage = (event:any) => observer.next(event.data)
        this.ws.onerror = (event:any) => observer.error(event)
        this.ws.onclose = (event:any) => observer.complete();
        return () => this.ws.close(1000,"User disconnected")
      }
    )
  }








  // subject: Subject<MessageEvent> | any
  // public connect(url:any): Subject<MessageEvent> {
  //   if(!this.subject){
  //     this.subject=this.create(url);
  //     console.log("connect to "+url)
      
  //   }
  //   return this.subject
  // }

  // public create(url:string): Subject<MessageEvent> {
  //   let ws = new WebSocket(url);

  //   let observable = Observable.create(
  //     (obs: Observer<MessageEvent>)=>{
  //       ws.onmessage = obs.next.bind(obs);
  //       ws.onerror = obs.error.bind(obs);
  //       ws.onclose = obs.complete.bind(obs);
  //       return ws.close.bind(ws)
  //     }
  //   )

  //   let observer = {
  //     next:(data:Object)=>{
  //       if(ws.readyState === WebSocket.OPEN){
  //         ws.send(JSON.stringify(data))
  //       }
  //     }
  //   }
  //   return Subject.create(observer, observable)
  // }

 




}
