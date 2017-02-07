import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { init } from './init';
import { defineModule } from './module';
import { WikiPage } from './model';

export { WikiPage } from './model';


declare var remoteStorage:any;


@Injectable()
export class StorageService {

  private changeSubject:Subject<any> = new Subject<any>();

  public constructor(zone:NgZone) {
    init();
    defineModule();
    remoteStorage.access.claim('wiki', 'rw');
    remoteStorage.wiki.privateArea("").addEventListener('change', event => {
      zone.run(() => {
        this.changeSubject.next(event);
      });
    });
  }

  public displayWidget() {
    remoteStorage.displayWidget();
  }

  public load(id:string):Promise<WikiPage> {
    return remoteStorage
      .wiki
      .privateArea("")
      .get(id);
  }

  public save(id:string, wikiPage:WikiPage):Promise<WikiPage> {
    return remoteStorage
      .wiki
      .privateArea("")
      .set(id, wikiPage);
  }

  public getChangeObservable():Observable<any> {
    return this.changeSubject.asObservable();
  }

}
