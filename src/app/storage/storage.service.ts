import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { init } from './init';
import { defineModule } from './module';
import { WikiPage } from './model';

export { WikiPage } from './model';


declare var remoteStorage:any;


@Injectable()
export class StorageService {

  public constructor() {
    init();
    defineModule();
    remoteStorage.access.claim('wiki', 'rw');
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

}
