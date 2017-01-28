import { Component, OnInit, Input } from '@angular/core';
import { Page, PageService } from './page.service';


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
  private page:Page;

  private floatingSource:string = '';

  constructor(private pageService:PageService) { }

  ngOnInit() {
    this.floatingSource = this.page.getContent();
    this.x = this.page.getX();
    this.y = this.page.getY();
    this.width = this.page.getWidth();
    this.height = this.page.getHeight();
    this.zindex = this.pageService.getNextZIndex();
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
    this.floatingSource = this.page.getContent();

    this.switchToView();
  }

  save() {
    this.page.setContent(this.floatingSource);
    this.page.setX(this.x);
    this.page.setY(this.y);
    this.page.setWidth(this.width);
    this.page.setHeight(this.height);

    this.pageService.savePage(this.page);
    this.switchToView();
  }

  close() {
    this.page.setX(this.x);
    this.page.setY(this.y);
    this.page.setWidth(this.width);
    this.page.setHeight(this.height);
    this.pageService.savePage(this.page);

    this.pageService.closePage(this.page.getId());
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
    this.maximized = !this.maximized;
    if (this.maximized) {
      this.oldX = this.x;
      this.oldY = this.y;
      this.x = 0;
      this.y = 0;
    } else {
      this.x = this.oldX;
      this.y = this.oldY;
    }
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
