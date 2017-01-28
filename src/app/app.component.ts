import { Component, OnInit } from '@angular/core';
import { Page, PageService } from './page/page.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private pageService:PageService) {}

  pages:Page[];
  data:string;
  showDataField:boolean = false;

  ngOnInit() {
    this.pageService.getPages().subscribe((pages) => {
      this.pages = pages;
    });
    this.start();
  }

  start() {
    this.pageService.openPage('Start');
  }

  importExport() {
    if (this.showDataField) {
      this.showDataField = false;
    } else {
      this.data = this.pageService.export();
      this.showDataField = true;
    }
  }

  import() {
    this.pageService.import(this.data);
    this.showDataField = false;
  }

  dataChange(event) {
    this.data = event.target.value;
  }

}
