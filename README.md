# QuikWik

## Description

QuikWik is a small and simple Wiki which uses Markdown Syntax. All the data is stored in the local storage in the browser. Remote Storage support is planned.

### Syntax

As it uses [marked](https://github.com/chjj/marked) for rendering, it supports everything [marked](https://github.com/chjj/marked) supports.

There is one addition to support linking between pages:

\[qw](Name of linked page)


## Live Version

Latest release is available on 5apps:
- https://quik-wik.5apps.com/


## Used Libraries

**Frontend:**
- http://purecss.io/
- http://fontawesome.io/

**Markdown and Code formatting:**
- https://github.com/chjj/marked
- http://prismjs.com/

**Storage:**
- https://remotestorage.io/


## Development

This project was generated with [angular-cli](https://github.com/angular/angular-cli).

### Development server
Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
