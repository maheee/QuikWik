import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { MarkdownComponent } from './markdown/markdown.component';

import { StorageService } from './storage/storage.service';
import { PageService } from './page/page.service';
import { MobileService } from './util/mobile.service';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    MarkdownComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    StorageService,
    PageService,
    MobileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
