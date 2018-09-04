import { Observable, BehaviorSubject } from 'rxjs';
export class GlobalSettings {
  

  
  // Our monitored shared global value
  // An Observable object that other components will subscribe to if they want
  // updates
  public globalValue$: BehaviorSubject<any>;

  // And here we'll shoot updates from.
  public observer: any;
  public data:any;

  constructor() {

    this.globalValue$ = new BehaviorSubject(observer => {
      this.observer = observer;
    });
  }

  // When a component wants to update the value, come in here.
  public updateValue(value) {
    // just retransmit the value. Alternatively you can check if it matches one
    // of desired values, if the caller has the correct authorization or similar.
    // We also need to check if there _is_ an observer. If nobody subscribed to
    // the observable, the observer would not exist and this would error out.
    this.data = value;
    if (this.globalValue$) {
      this.globalValue$.next(value);
    }
  }

  public getValue() {
    return this.data;
  }

}

