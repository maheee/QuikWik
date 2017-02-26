import { Component, OnInit, Input } from '@angular/core';
import { WikiPage, PageService } from './page.service';
import { MobileService } from '../util/mobile.service';


declare var window:any;
declare var document:any;


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  private isViewActive:boolean = true;
  private isSourceActive:boolean = false;

  @Input()
  private page:WikiPage;

  private floatingSource:string = '';

  private isMobile:boolean;

  constructor(
      private mobileService:MobileService,
      private pageService:PageService) {
  }

  ngOnInit() {
    this.floatingSource = this.page.content;
    this.x = this.page.x;
    this.y = this.page.y;
    this.width = this.page.width;
    this.height = this.page.height;
    this.zindex = this.pageService.getNextZIndex();

    this.mobileService.isMobile().subscribe(isMobile => {
      this.isMobile = isMobile;
      if (isMobile) {
        this.maximize();
      }
    });

    this.pageService.getChangeObservable().subscribe(event => {
      if (event.newValue && event.newValue.title == this.page.title) {
        this.page = event.newValue;
        this.x = this.page.x;
        this.y = this.page.y;
        this.width = this.page.width;
        this.height = this.page.height;
      }
    });
  }

  toggleSource() {
    if (this.isViewActive) {
      this.switchToSource();
    } else {
      this.revert();
    }
  }

  switchToView() {
    this.isViewActive = true;
    this.isSourceActive = false;
  }

  switchToSource() {
    this.isViewActive = false;
    this.isSourceActive = true;
  }

  textAreaChange(event) {
    this.floatingSource = event.target.value;
  }

  revert() {
    this.floatingSource = this.page.content;

    this.switchToView();
  }

  save() {
    this.page.content = this.floatingSource;
    this.page.x = (this.maximized ? this.oldX : this.x);
    this.page.y = (this.maximized ? this.oldY : this.y);
    this.page.width = this.width;
    this.page.height = this.height;

    this.pageService.savePage(this.page);
    this.switchToView();
  }

  close() {
    //this.page.x = (this.maximized ? this.oldX : this.x);
    //this.page.y = (this.maximized ? this.oldY : this.y);
    //this.page.width = this.width;
    //this.page.height = this.height;
    //this.pageService.savePage(this.page);

    this.pageService.closePage(this.page.title);
  }

  /*
   * Movement
   */
  minWidth:number = 250;
  minHeight:number = 100;

  x:number = 100;
  y:number = 100;
  width:number = 300;
  height:number = 300;

  oldX:number = 100;
  oldY:number = 100;
  maximized:boolean = false;

  zindex:number = 10;

  lastPosX:number;
  lastPosY:number;
  dragging:boolean = false;
  resizing:boolean = false;

  headerMouseDown(event) {
    this.lastPosX = event.clientX;
    this.lastPosY = event.clientY;
    this.dragging = true;
    this.zindex = this.pageService.getNextZIndex();
  }

  resizerMouseDown(event) {
    this.lastPosX = event.clientX;
    this.lastPosY = event.clientY;
    this.resizing = true;
    this.zindex = this.pageService.getNextZIndex();
  }

  mouseUp(event) {
    this.dragging = false;
    this.resizing = false;
  }

  mouseLeave(event) {
    this.mouseUp(event);
  }

  mouseMove(event) {
    if (this.maximized) {
      return;
    }
    if (this.dragging) {
      this.x += event.clientX - this.lastPosX;
      this.y += event.clientY - this.lastPosY;

      this.clearSelection();
    }
    if (this.resizing) {
      this.width += event.clientX - this.lastPosX;
      this.height += event.clientY - this.lastPosY;
      if (this.width < this.minWidth) {
        this.width = this.minWidth;
      }
      if (this.height < this.minHeight) {
        this.height = this.minHeight;
      }

      this.clearSelection();
    }
    this.lastPosX = event.clientX;
    this.lastPosY = event.clientY;
  }

  toggleMaximize() {
    if (this.maximized) {
      this.unmaximize();
    } else {
      this.maximize();
    }
  }

  maximize() {
    if (this.maximized) {
      return;
    }
    this.maximized = true;
    this.oldX = this.x;
    this.oldY = this.y;
    this.x = 0;
    this.y = 0;
  }

  unmaximize() {
    if (!this.maximized) {
      return;
    }
    this.maximized = false;
    this.x = this.oldX;
    this.y = this.oldY;
  }

  clearSelection() {
    let selection = window.getSelection ? window.getSelection() : document.selection;
    if (selection) {
      if (selection.removeAllRanges) {
        selection.removeAllRanges();
      } else if (selection.empty) {
        selection.empty();
      }
    }
  }

}
