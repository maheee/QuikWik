import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';


declare var window:any;


@Injectable()
export class MobileService {

  private desktopMatch = "(min-width: 600px) and (min-height: 600px)";
  private _isMobile:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  public constructor() {
    let match = window.matchMedia(this.desktopMatch);
    if (match.matches) {
      this.manuallySetDesktop();
    } else {
      this.manuallySetMobile();
    }
  }

  public isMobile():Observable<boolean> {
    return this._isMobile.asObservable();
  }

  public manuallySetMobile() {
    this._isMobile.next(true);
  }

  public manuallySetDesktop() {
    this._isMobile.next(false);
  }

}
