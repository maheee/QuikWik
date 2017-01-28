import { Component, ElementRef, Input, OnChanges } from '@angular/core';
import * as marked from 'marked';

import 'prismjs/prism';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-diff';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-git';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-http';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-less';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-nginx';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-yaml';


declare var Prism:any;


@Component({
  selector: 'markdown,[Markdown]',
  template: '<ng-content></ng-content>',
  styles: [
    `.token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
      background: none;
    }`
  ]
})
export class MarkdownComponent implements OnChanges {

  private renderer;

  @Input()
  private rawText:string;

  constructor(private el: ElementRef) {
    marked.setOptions({
      highlight: function (code:string, lang:string, callback:Function) {
        if (lang && Prism.languages[lang]) {
          code = Prism.highlight(code, Prism.languages[lang]);
        }
        if (callback) {
          callback(null, code);
        }
        return code;
      }
    });

    this.renderer = new marked.Renderer();
    this.renderer.link = function (href:string, title:string, text:string) {
      if (text == 'qw') {
        return "<a href=\"javascript:\" onClick=\"openPage('" + href + "')\">" + href + "</a>";
      } else {
        return "<a href=\"" + href + "\" title=\"" + title + "\" target=\"_blank\">" + text + "</a>";
      }
    };
  }

  ngOnChanges() {
    let md = this.prepare(this.rawText);
    this.el.nativeElement.innerHTML = marked(md, {
      renderer: this.renderer
    });
  }

  private prepare(raw: any) {
    if (!raw) {
      return '';
    }
    return raw;
  }

}
