import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import { MarkdownComponent } from './markdown/markdown.component';

import { PageService } from './page/page.service';


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
    PageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
