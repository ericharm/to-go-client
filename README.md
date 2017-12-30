For use with [https://github.com/ericharm/to-go-api](https://github.com/ericharm/to-go-api)

If you want to use the API, follow instructions for setting it up and run the server before starting this app.

# to-go-client

`git clone https://github.com/ericharm/to-go-client.git`

`cd to-go-client`

`npm install`

`ng serve`

# Resources

I originally set up a basic auth system that involved storing a user's auth token in a cookie and using it to make requests to the server.  This left me with the challenge of finding a way to update my UI with a Log Out button or menu whenever a user is logged in.  I read up on maintaining application state with @ngrx/store but it seemed overcomplicated.  I eventually found the simple answer at [https://loiane.com/2017/08/angular-hide-navbar-login-page/](https://loiane.com/2017/08/angular-hide-navbar-login-page/) and redid my login to match the one described there by Loiane Groner.


*The rest of this readme was automatically generated by Angular CLI:*

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
