webpackJsonp([0,4],{138:function(e,t,i){"use strict";var n=i(0),r=i(76),o=(i.n(r),i(459)),a=i(461),s=i(460);i.d(t,"b",function(){return s.a}),i.d(t,"a",function(){return u});var c=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},p=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},u=function(){function e(e){var t=this;this.changeSubject=new r.Subject,i.i(o.a)(),i.i(a.a)(),remoteStorage.access.claim("wiki","rw"),remoteStorage.wiki.privateArea("").addEventListener("change",function(i){e.run(function(){t.changeSubject.next(i)})})}return e.prototype.displayWidget=function(){remoteStorage.displayWidget()},e.prototype.load=function(e){return remoteStorage.wiki.privateArea("").get(e)},e.prototype.save=function(e,t){return remoteStorage.wiki.privateArea("").set(e,t)},e.prototype.getChangeObservable=function(){return this.changeSubject.asObservable()},e=c([i.i(n.c)(),p("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.d&&n.d)&&t||Object])],e);var t}()},139:function(e,t,i){"use strict";var n=i(0),r=i(340);i.n(r);i.d(t,"a",function(){return s});var o=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},a=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},s=function(){function e(){this.desktopMatch="(min-width: 600px) and (min-height: 600px)",this._isMobile=new r.BehaviorSubject(!0);var e=window.matchMedia(this.desktopMatch);e.matches?this.manuallySetDesktop():this.manuallySetMobile()}return e.prototype.isMobile=function(){return this._isMobile.asObservable()},e.prototype.manuallySetMobile=function(){this._isMobile.next(!0)},e.prototype.manuallySetDesktop=function(){this._isMobile.next(!1)},e=o([i.i(n.c)(),a("design:paramtypes",[])],e)}()},201:function(e,t,i){"use strict";var n=i(0),r=i(340),o=(i.n(r),i(138));i.d(t,"b",function(){return o.b});var a=i(139);i.d(t,"a",function(){return p});var s=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},c=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},p=function(){function e(e,t,i){var n=this;this.storageService=t,this.zone=i,this.DEFAULT_CONTENT="",this.DEFAULT_X=100,this.DEFAULT_Y=100,this.DEFAULT_WIDTH=300,this.DEFAULT_HEIGHT=300,this.pages=new r.BehaviorSubject([]),this.lastZIndex=1;var o=this;window.openPage=function(e){o.openPageFromOutside(e)},e.isMobile().subscribe(function(e){n.isMobile=e})}return e.prototype.getPages=function(){return this.pages.asObservable()},e.prototype.getChangeObservable=function(){return this.storageService.getChangeObservable()},e.prototype.openPageFromOutside=function(e){var t=this;this.zone.run(function(){t.openPage(e)})},e.prototype.openPage=function(e){var t=this;return this.closePage(e),this.loadPage(e).then(function(e){t.sanitizeCoordinates(e);var i=t.pages.getValue();return i.push(e),t.pages.next(i),e})},e.prototype.closePage=function(e){for(var t=this.pages.getValue(),i=0;i<t.length;++i)if(t[i].title==e){t.splice(i,1);break}this.pages.next(t)},e.prototype.closeAllPages=function(){this.pages.next([])},e.prototype.savePage=function(e){var t=this.createId(e.title);return this.storageService.save(t,e).catch(function(e){console.error("Failed to store page!"),console.error(e)})},e.prototype.getNextZIndex=function(){return++this.lastZIndex},e.prototype.loadPage=function(e){var t=this,i=this.createId(e);return new Promise(function(n,r){t.storageService.load(i).then(function(i){n(i?i:new o.b(e,t.DEFAULT_CONTENT,t.DEFAULT_X,t.DEFAULT_Y,t.DEFAULT_WIDTH,t.DEFAULT_HEIGHT))}).catch(function(e){console.error("Failed to load page!"),console.error(e),r(e)})})},e.prototype.createId=function(e){return"page__"+e.replace(" ","_")},e.prototype.sanitizeCoordinates=function(e){var t=window.innerWidth,i=window.innerHeight,n=t-this.DEFAULT_WIDTH,r=i-this.DEFAULT_HEIGHT;e.x<0&&(e.x=0),e.y<0&&(e.y=0),e.x>n&&(e.x=n),e.y>r&&(e.y=r),e.x+e.width>t&&(e.width=t-e.x),e.y+e.height>i&&(e.height=i-e.y)},e=s([i.i(n.c)(),c("design:paramtypes",["function"==typeof(t="undefined"!=typeof a.a&&a.a)&&t||Object,"function"==typeof(p="undefined"!=typeof o.a&&o.a)&&p||Object,"function"==typeof(u="undefined"!=typeof n.d&&n.d)&&u||Object])],e);var t,p,u}()},346:function(e,t){function i(e){throw new Error("Cannot find module '"+e+"'.")}i.keys=function(){return[]},i.resolve=i,e.exports=i,i.id=346},347:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=(i(463),i(435)),r=i(0),o=i(462),a=i(456);o.a.production&&i.i(r.a)(),i.i(n.a)().bootstrapModule(a.a)},455:function(e,t,i){"use strict";var n=i(0),r=i(201),o=i(138),a=i(139);i.d(t,"a",function(){return p});var s=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},c=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},p=function(){function e(e,t,i){this.storageService=e,this.pageService=t,this.mobileService=i,this.showDataField=!1}return e.prototype.ngOnInit=function(){this.pageService.getPages(),this.storageService.displayWidget(),this.start()},e.prototype.start=function(){this.pageService.openPage("Start")},e.prototype.dataChange=function(e){this.data=e.target.value},e.prototype.manuallySetMobile=function(){this.mobileService.manuallySetMobile()},e.prototype.manuallySetDesktop=function(){this.mobileService.manuallySetDesktop()},e=s([i.i(n.U)({selector:"app-root",template:i(648),styles:[i(645)]}),c("design:paramtypes",["function"==typeof(t="undefined"!=typeof o.a&&o.a)&&t||Object,"function"==typeof(p="undefined"!=typeof r.a&&r.a)&&p||Object,"function"==typeof(u="undefined"!=typeof a.a&&a.a)&&u||Object])],e);var t,p,u}()},456:function(e,t,i){"use strict";var n=i(193),r=i(0),o=i(425),a=i(431),s=i(455),c=i(458),p=i(457),u=i(138),l=i(201),f=i(139);i.d(t,"a",function(){return g});var h=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},d=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},g=function(){function e(){}return e=h([i.i(r.b)({declarations:[s.a,c.a,p.a],imports:[n.a,o.a,a.a],providers:[u.a,l.a,f.a],bootstrap:[s.a]}),d("design:paramtypes",[])],e)}()},457:function(e,t,i){"use strict";var n=i(0),r=i(615),o=(i.n(r),i(643)),a=(i.n(o),i(616)),s=(i.n(a),i(617)),c=(i.n(s),i(619)),p=(i.n(c),i(620)),u=(i.n(p),i(618)),l=(i.n(u),i(621)),f=(i.n(l),i(622)),h=(i.n(f),i(623)),d=(i.n(h),i(624)),g=(i.n(d),i(625)),b=(i.n(g),i(626)),y=(i.n(b),i(627)),v=(i.n(y),i(628)),m=(i.n(v),i(629)),x=(i.n(m),i(630)),w=(i.n(x),i(631)),S=(i.n(w),i(632)),k=(i.n(S),i(633)),z=(i.n(k),i(634)),_=(i.n(z),i(635)),j=(i.n(_),i(636)),O=(i.n(j),i(637)),P=(i.n(O),i(638)),R=(i.n(P),i(639)),T=(i.n(R),i(640)),D=(i.n(T),i(641)),A=(i.n(D),i(642));i.n(A);i.d(t,"a",function(){return I});var M=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},E=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},I=function(){function e(e){this.el=e,r.setOptions({highlight:function(e,t,i){return t&&Prism.languages[t]&&(e=Prism.highlight(e,Prism.languages[t])),i&&i(null,e),e}}),this.renderer=new r.Renderer,this.renderer.link=function(e,t,i){return"qw"==i?'<a href="javascript:" onClick="openPage(\''+e+"')\">"+e+"</a>":'<a href="'+e+'" title="'+t+'" target="_blank">'+i+"</a>"}}return e.prototype.ngOnChanges=function(){var e=this.prepare(this.rawText);this.el.nativeElement.innerHTML=r(e,{renderer:this.renderer})},e.prototype.prepare=function(e){return e?e:""},M([i.i(n.x)(),E("design:type",String)],e.prototype,"rawText",void 0),e=M([i.i(n.U)({selector:"markdown,[Markdown]",template:"<ng-content></ng-content>",styles:[".token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {\n      background: none;\n    }"]}),E("design:paramtypes",["function"==typeof(t="undefined"!=typeof n.D&&n.D)&&t||Object])],e);var t}()},458:function(e,t,i){"use strict";var n=i(0),r=i(201),o=i(139);i.d(t,"a",function(){return c});var a=this&&this.__decorate||function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a},s=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},c=function(){function e(e,t){this.mobileService=e,this.pageService=t,this.isViewActive=!0,this.isSourceActive=!1,this.floatingSource="",this.minWidth=250,this.minHeight=100,this.x=100,this.y=100,this.width=300,this.height=300,this.oldX=100,this.oldY=100,this.maximized=!1,this.zindex=10,this.dragging=!1,this.resizing=!1}return e.prototype.ngOnInit=function(){var e=this;this.floatingSource=this.page.content,this.x=this.page.x,this.y=this.page.y,this.width=this.page.width,this.height=this.page.height,this.zindex=this.pageService.getNextZIndex(),this.mobileService.isMobile().subscribe(function(t){e.isMobile=t,t&&e.maximize()}),this.pageService.getChangeObservable().subscribe(function(t){t.newValue&&t.newValue.title==e.page.title&&(e.page=t.newValue,e.x=e.page.x,e.y=e.page.y,e.width=e.page.width,e.height=e.page.height)})},e.prototype.toggleSource=function(){this.isViewActive?this.switchToSource():this.revert()},e.prototype.switchToView=function(){this.isViewActive=!0,this.isSourceActive=!1},e.prototype.switchToSource=function(){this.isViewActive=!1,this.isSourceActive=!0},e.prototype.textAreaChange=function(e){this.floatingSource=e.target.value},e.prototype.revert=function(){this.floatingSource=this.page.content,this.switchToView()},e.prototype.save=function(){this.page.content=this.floatingSource,this.page.x=this.maximized?this.oldX:this.x,this.page.y=this.maximized?this.oldY:this.y,this.page.width=this.width,this.page.height=this.height,this.pageService.savePage(this.page),this.switchToView()},e.prototype.close=function(){this.pageService.closePage(this.page.title)},e.prototype.headerMouseDown=function(e){this.lastPosX=e.clientX,this.lastPosY=e.clientY,this.dragging=!0,this.zindex=this.pageService.getNextZIndex()},e.prototype.resizerMouseDown=function(e){this.lastPosX=e.clientX,this.lastPosY=e.clientY,this.resizing=!0,this.zindex=this.pageService.getNextZIndex()},e.prototype.mouseUp=function(e){this.dragging=!1,this.resizing=!1},e.prototype.mouseLeave=function(e){this.mouseUp(e)},e.prototype.mouseMove=function(e){this.maximized||(this.dragging&&(this.x+=e.clientX-this.lastPosX,this.y+=e.clientY-this.lastPosY,this.clearSelection()),this.resizing&&(this.width+=e.clientX-this.lastPosX,this.height+=e.clientY-this.lastPosY,this.width<this.minWidth&&(this.width=this.minWidth),this.height<this.minHeight&&(this.height=this.minHeight),this.clearSelection()),this.lastPosX=e.clientX,this.lastPosY=e.clientY)},e.prototype.toggleMaximize=function(){this.maximized?this.unmaximize():this.maximize()},e.prototype.maximize=function(){this.maximized||(this.maximized=!0,this.oldX=this.x,this.oldY=this.y,this.x=0,this.y=0)},e.prototype.unmaximize=function(){this.maximized&&(this.maximized=!1,this.x=this.oldX,this.y=this.oldY)},e.prototype.clearSelection=function(){var e=window.getSelection?window.getSelection():document.selection;e&&(e.removeAllRanges?e.removeAllRanges():e.empty&&e.empty())},a([i.i(n.x)(),s("design:type","function"==typeof(t="undefined"!=typeof r.b&&r.b)&&t||Object)],e.prototype,"page",void 0),e=a([i.i(n.U)({selector:"app-page",template:i(649),styles:[i(646)]}),s("design:paramtypes",["function"==typeof(c="undefined"!=typeof o.a&&o.a)&&c||Object,"function"==typeof(p="undefined"!=typeof r.a&&r.a)&&p||Object])],e);var t,c,p}()},459:function(e,t,i){"use strict";function n(){Promise.defer=function(){var e,t,i=new Promise(function(){e=arguments[0],t=arguments[1]});return{resolve:e,reject:t,promise:i}}}t.a=n},460:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n=function(){function e(e,t,i,n,r,o){this.title=e,this.content=t,this.x=i,this.y=n,this.width=r,this.height=o}return e}()},461:function(e,t,i){"use strict";function n(){RemoteStorage.defineModule("wiki",function(e,t){function i(e,t){return e.scope(t).extend(r)}e.declareType("page",{type:"object",properties:{title:{type:"string",required:!0},content:{type:"string",required:!0,default:""},x:{type:"integer",required:!1},y:{type:"integer",required:!1},width:{type:"integer",required:!1},height:{type:"integer",required:!1},lastEdited:{type:"integer",required:!0}}});var n={privateArea:function(t){return i(e,t)},publicArea:function(e){return i(t,e)}},r={set:function(e,t){return t.lastEdited=+Date.now(),this.storeObject("page",e,t)},get:function(e){return this.getObject(e.toString())}};return{exports:n}})}t.a=n},462:function(e,t,i){"use strict";i.d(t,"a",function(){return n});var n={production:!0}},463:function(e,t,i){"use strict";var n=i(477),r=(i.n(n),i(470)),o=(i.n(r),i(466)),a=(i.n(o),i(472)),s=(i.n(a),i(471)),c=(i.n(s),i(469)),p=(i.n(c),i(468)),u=(i.n(p),i(476)),l=(i.n(u),i(465)),f=(i.n(l),i(464)),h=(i.n(f),i(474)),d=(i.n(h),i(467)),g=(i.n(d),i(475)),b=(i.n(g),i(473)),y=(i.n(b),i(478)),v=(i.n(y),i(661));i.n(v)},645:function(e,t){e.exports="h1,p,a,a:hover,a:visited,a:active{color:#9CD5E5;text-decoration:none}h1,p{margin-left:20px}.active{cursor:pointer}\n"},646:function(e,t){e.exports=".wrapper.maximized{width:100% !important;height:100% !important;z-index:2147483647 !important}.wrapper{position:absolute;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.wrapper .resizer{position:absolute;right:0px;bottom:0px;width:20px;height:20px}.wrapper .header{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-preferred-size:22px;flex-basis:22px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row}.wrapper .header .frontTabbar{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-preferred-size:35px;flex-basis:35px}.wrapper .header .backTabbar{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-preferred-size:80px;flex-basis:80px;text-align:right}.wrapper .header .title{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1}.wrapper .header .title div{position:relative;top:2px}.wrapper .tabView,.wrapper .tabSource{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;left:0px;width:100%}.wrapper .tabView{overflow-y:auto}.wrapper .tabSource{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.wrapper .tabSource textarea{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;resize:none}.wrapper .tabSource .buttons{-webkit-box-flex:0;-ms-flex-positive:0;flex-grow:0;-ms-flex-preferred-size:22px;flex-basis:22px;width:100%}.wrapper{box-shadow:5px 5px 10px 0px rgba(0,0,0,0.75);border-radius:5px;background-color:white}.wrapper .resizer{width:0;height:0;border-style:solid;border-width:0 0 10px 10px;border-color:transparent transparent #66b0ff transparent;cursor:se-resize}.wrapper .header{border-bottom:1px solid lightgray;cursor:move}.wrapper .header .backTabbar{text-align:right}.wrapper .header .title div{font-weight:bold}.wrapper .header .pure-button{font-size:60%}.wrapper .header .pure-button.source{background-color:#E6E6E6}.wrapper .header .pure-button.maximize{background-color:#E6E6E6}.wrapper .header .pure-button.close{background-color:#ff9d97}.wrapper .tabView{padding-left:5px;padding-right:5px}.wrapper .tabSource textarea{font-size:12px;padding-top:0px;padding-bottom:0px;padding-left:5px;padding-right:5px}.wrapper .tabSource .buttons .pure-button{font-size:75%;font-weight:bold}.wrapper .tabSource .buttons .pure-button.revert{background-color:#E6E6E6}.wrapper .tabSource .buttons .pure-button.save{background-color:#66b0ff}\n"},648:function(e,t){e.exports='\r\n<h1 class="active">\r\n  <span (click)="start()">Quik Wik</span>&nbsp;\r\n  <span class="fa fa-tablet" *ngIf=" (mobileService.isMobile() | async)" (click)="manuallySetDesktop()"></span>\r\n  <span class="fa fa-laptop" *ngIf="!(mobileService.isMobile() | async)" (click)="manuallySetMobile()"></span>\r\n</h1>\r\n\r\n<p>\r\n  <a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/" target="_blank">\r\n    <span class="fa fa-code"></span>\r\n  </a>,\r\n  <a href="https://github.com/maheee/QuikWik" target="_blank">\r\n    <span class="fa fa-copyright"></span>\r\n    mahe, 2017\r\n  </a>\r\n</p>\r\n\r\n<app-page *ngFor="let page of (pageService.getPages() | async)" [page]="page">\r\n</app-page>\r\n'},649:function(e,t){e.exports='<div class="wrapper {{maximized ? \'maximized\' : \'\'}}"\r\n    [style.left.px]="x"\r\n    [style.top.px]="y"\r\n    [style.width.px]="width"\r\n    [style.height.px]="height"\r\n    [style.z-index]="zindex"\r\n    (document:mouseup)="mouseUp($event)"\r\n    (document:mouseleave)="mouseLeave($event)"\r\n    (document:mousemove)="mouseMove($event)">\r\n\r\n  <!-- Resizer -->\r\n  <div *ngIf="!maximized && isViewActive" class="resizer"\r\n      (mousedown)="resizerMouseDown($event)">\r\n  </div>\r\n\r\n  <!-- Header -->\r\n  <div class="header"\r\n      (mousedown)="headerMouseDown($event)">\r\n    <div class="frontTabbar pure-button-group"\r\n        role="group">\r\n      <button class="pure-button source {{isSourceActive ? \'pure-button-active\' : \'\'}}"\r\n          (click)="toggleSource()">\r\n        <i class="fa fa-code"></i>\r\n      </button>\r\n    </div>\r\n    <div class="title">\r\n      <div>{{page.title}}</div>\r\n    </div>\r\n    <div class="backTabbar pure-button-group" role="group">\r\n      <button\r\n          *ngIf="!isMobile"\r\n          class="pure-button maximize {{maximized ? \'pure-button-active\' : \'\'}}"\r\n          (click)="toggleMaximize()">\r\n        <i class="fa fa-window-maximize"></i>\r\n      </button>\r\n      <button\r\n          class="pure-button close"\r\n          (click)="close()">\r\n        <i class="fa fa-times"></i>\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Content View -->\r\n  <div *ngIf="isViewActive" class="tabView">\r\n    <markdown [rawText]="page.content"></markdown>\r\n  </div>\r\n\r\n  <!-- Source View -->\r\n  <div *ngIf="isSourceActive" class="tabSource pure-form">\r\n    <textarea\r\n        class="pure-input-1"\r\n        placeholder="Textareas work too"\r\n        (change)="textAreaChange($event)"\r\n        [value]="floatingSource">\r\n    </textarea>\r\n    <div class="buttons pure-g">\r\n      <div class="pure-u-1-3">\r\n        <button\r\n            type="submit"\r\n            class="pure-button revert pure-input-1"\r\n            (click)="revert()">\r\n          <i class="fa fa-undo"></i>\r\n          Revert\r\n        </button>\r\n      </div>\r\n      <div class="pure-u-1-3">\r\n      </div>\r\n      <div class="pure-u-1-3">\r\n        <button\r\n            type="submit"\r\n            class="pure-button save pure-input-1"\r\n            (click)="save()">\r\n          <i class="fa fa-hdd-o"></i>\r\n          Save\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n'},662:function(e,t,i){e.exports=i(347)}},[662]);