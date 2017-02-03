import { Component, OnInit } from '@angular/core';
import { WikiPage, PageService } from './page/page.service';

import { StorageService } from './storage/storage.service';
import { MobileService } from './util/mobile.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
      private storageService:StorageService,
      private pageService:PageService,
      private mobileService:MobileService) {}

  pages:WikiPage[];
  data:string;
  showDataField:boolean = false;

  ngOnInit() {
    this.pageService.getPages();
    this.storageService.displayWidget();
    this.start();
  }

  start() {
    this.pageService.openPage('Start');
  }

  dataChange(event) {
    this.data = event.target.value;
  }

  manuallySetMobile() {
    this.mobileService.manuallySetMobile();
  }

  manuallySetDesktop() {
    this.mobileService.manuallySetDesktop();
  }

}
