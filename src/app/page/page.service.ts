import { NgZone, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService, WikiPage } from '../storage/storage.service';
export { WikiPage } from '../storage/storage.service';

import { MobileService } from '../util/mobile.service';


declare var window:any;


@Injectable()
export class PageService {

  private readonly DEFAULT_CONTENT:string = '';
  private readonly DEFAULT_X:number = 100;
  private readonly DEFAULT_Y:number = 100;
  private readonly DEFAULT_WIDTH:number = 300;
  private readonly DEFAULT_HEIGHT:number = 300;

  private pages:BehaviorSubject<WikiPage[]> = new BehaviorSubject<WikiPage[]>([]);

  private lastZIndex:number = 1;

  private isMobile:boolean;

  constructor(
      mobileService:MobileService,
      private storageService:StorageService,
      private zone:NgZone) {

    let that = this;

    window.openPage = function (id) {
      that.openPageFromOutside(id);
    }

    mobileService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
    })
  }

  getPages() {
    return this.pages.asObservable();
  }

  openPageFromOutside(id:string) {
    this.zone.run(() => {
      this.openPage(id);
    });
  }

  openPage(title:string):Promise<WikiPage> {
    /*if (this.isMobile) {
      this.closeAllPages();
    } else {
      this.closePage(title);
    }*/
    this.closePage(title);

    return this.loadPage(title).then(page => {
      this.sanitizeCoordinates(page);

      let pagesList = this.pages.getValue();
      pagesList.push(page);
      this.pages.next(pagesList);

      return page;
    });
  }

  closePage(title:string) {
    let pagesList = this.pages.getValue();
    for (let i = 0; i < pagesList.length; ++i) {
      if (pagesList[i].title == title) {
        pagesList.splice(i, 1);
        break;
      }
    }
    this.pages.next(pagesList);
  }

  closeAllPages() {
    this.pages.next([]);
  }

  savePage(page:WikiPage):Promise<WikiPage> {
    let id = this.createId(page.title);

    return this.storageService.save(id, page);
  }

  getNextZIndex() {
    return ++this.lastZIndex;
  }

  private loadPage(title:string):Promise<WikiPage> {
    let id = this.createId(title);

    return new Promise<WikiPage>((resolve, reject) => {
      this.storageService.load(id).then(page => {
        if (page) {
          resolve(page);
        } else {
          resolve(new WikiPage(
                  title,
                  this.DEFAULT_CONTENT,
                  this.DEFAULT_X,
                  this.DEFAULT_Y,
                  this.DEFAULT_WIDTH,
                  this.DEFAULT_HEIGHT));
        }
      });
    });
  }

  private createId(title:string) {
    return "page__" + title.replace(" ", "_");
  }

  private sanitizeCoordinates(page:WikiPage) {
    let iw = window.innerWidth;
    let ih = window.innerHeight;
    let ww = iw - this.DEFAULT_WIDTH;
    let wh = ih - this.DEFAULT_HEIGHT;

    if (page.x < 0) {
      page.x = 0;
    }
    if (page.y < 0) {
      page.y = 0;
    }
    if (page.x > ww) {
      page.x = ww;
    }
    if (page.y > wh) {
      page.y = wh;
    }
    if (page.x + page.width > iw) {
      page.width = iw - page.x;
    }
    if (page.y + page.height > ih) {
      page.height = ih - page.y;
    }
  }

}
