import { NgZone, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


declare var window:any;


export class Page {

  constructor(
      private id:string,
      private content:string,
      private x:number,
      private y:number,
      private width:number,
      private height:number) {
  }

  public getId() { return this.id; }

  public getContent() { return this.content; }
  public getX() { return this.x; }
  public getY() { return this.y; }
  public getWidth() { return this.width; }
  public getHeight() { return this.height; }

  public setContent(content:string) { this.content = content; }
  public setX(x:number) { this.x = x; }
  public setY(y:number) { this.y = y; }
  public setWidth(width:number) { this.width = width; }
  public setHeight(height:number) { this.height = height; }
}

@Injectable()
export class PageService {

  private readonly DEFAULT_CONTENT:string = '';
  private readonly DEFAULT_X:number = 100;
  private readonly DEFAULT_Y:number = 100;
  private readonly DEFAULT_WIDTH:number = 300;
  private readonly DEFAULT_HEIGHT:number = 300;

  private pages:BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>([]);

  private lcPrefix:string = 'qw_';

  private lastZIndex = 1;

  constructor(private zone:NgZone) {
    let that = this;

    window.openPage = function (id) {
      that.openPageFromOutside(id);
    }
  }

  getPages() {
    return this.pages.asObservable();
  }

  openPageFromOutside(id:string) {
    this.zone.run(() => {
      this.openPage(id);
    });
  }

  openPage(id:string):Page {
    this.closePage(id);

    let page = this.loadPage(id);
    this.sanitizeCoordinates(page);

    let pagesList = this.pages.getValue();
    pagesList.push(page);
    this.pages.next(pagesList);

    return page;
  }

  closePage(id:string) {
    let pagesList = this.pages.getValue();
    for (let i = 0; i < pagesList.length; ++i) {
      if (pagesList[i].getId() == id) {
        pagesList.splice(i, 1);
        break;
      }
    }
    this.pages.next(pagesList);
  }

  savePage(page:Page) {
    let id = this.lcPrefix + page.getId();
    if (page.getContent() && page.getContent().length > 0) {
      window.localStorage.setItem(id, JSON.stringify({
        id: page.getId(),
        content: page.getContent(),
        x: page.getX(),
        y: page.getY(),
        width: page.getWidth(),
        height: page.getHeight()
      }));
    } else {
      window.localStorage.removeItem(id);
    }
  }

  import(data:string) {
    try {
      let parsed:any = JSON.parse(data);
      for (let i in parsed) {
        data = parsed[i];
        if (data && data.length && data.length > 0) {
          window.localStorage.setItem('' + i, data);
        }
      }
    } catch (e) {
      console.error("Importing Data failed!");
      console.error(e);
    }
  }

  export() {
    return JSON.stringify(window.localStorage);
  }

  getNextZIndex() {
    return ++this.lastZIndex;
  }

  private loadPage(id:string) {
    let p = window.localStorage.getItem(this.lcPrefix + id);
    if (p) {
      p = JSON.parse(p);
    }
    if (p && p.id) {
      return new Page(
          p.id,
          p.content || this.DEFAULT_CONTENT,
          p.x || this.DEFAULT_X,
          p.y || this.DEFAULT_Y,
          p.width || this.DEFAULT_WIDTH,
          p.height || this.DEFAULT_HEIGHT);
    } else {
      return new Page(
          id,
          this.DEFAULT_CONTENT,
          this.DEFAULT_X,
          this.DEFAULT_Y,
          this.DEFAULT_WIDTH,
          this.DEFAULT_HEIGHT);
    }
  }

  private sanitizeCoordinates(page:Page) {
    let iw = window.innerWidth;
    let ih = window.innerHeight;
    let ww = iw - this.DEFAULT_WIDTH;
    let wh = ih - this.DEFAULT_HEIGHT;

    if (page.getX() < 0) {
      page.setX(0);
    }
    if (page.getY() < 0) {
      page.setY(0);
    }
    if (page.getX() > ww) {
      page.setX(ww);
    }
    if (page.getY() > wh) {
      page.setY(wh);
    }
    if (page.getX() + page.getWidth() > iw) {
      page.setWidth(iw - page.getX());
    }
    if (page.getY() + page.getHeight() > ih) {
      page.setHeight(ih - page.getY());
    }
  }

}
