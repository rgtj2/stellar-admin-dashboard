_**Deprecated**_

# StellarAdminDashboard

Dashboard for administering a Stellar test network

There is a npm script to run an 'ephemeral' Stellar-core and Horizon instance locally.

First, to set everything up:

1) Make sure you have Node and NPM installed  
2) Run ```npm install```  
3) Make sure you have Docker installed and running  

4a) Run the docker container in ephemeral mode:  

 - Run ```chmod +x ./scripts/init-ephemeral-network.sh``` to set permissions on the file running the docker script  
 - Run ```npm run stellar-ephemeral``` to run the docker container  

4b) Run the Docker container in persistent mode:  
 - Update the path in /scripts/init-persistent-network.sh to your local directory
 - Run ```chmod +x ./scripts/init-peristent-network.sh``` to set permissions on the file running the docker script  
 - Run ```npm run stellar-persistent``` to initialize the docker container  
 - Go through the interactive steps. Then, quit the session.
 - Restart the service with another ```npm run stellar-persistent```

5) Run ```npm start``` in a separate session to start the client app  


# Stellar Core / Horizon Development

See the official docs [here](https://github.com/stellar/docker-stellar-core-horizon)

## Angular Development

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
