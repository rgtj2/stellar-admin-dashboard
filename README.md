# StellarAdminDashboard

Dashboard for administering a Stellar test network

There is a npm script to run an 'ephemeral' Stellar-core and Horizon instance locally.

First, to set everything up:

1) Make sure you have Node and NPM installed
2) Run ```npm install```
 - This will install node modules used for the client application
3) Make sure you have Docker installed and running

4) Run the docker container and client app

    a) Run ```chmod +x ./scripts/test-docker.sh``` to set permission to run the test docker script
    b) Run ```npm run stellar-docker``` to run the docker container
    c) Run ```npm start``` in a separate session to start the client app


# Development

## To run the Official Stellar Core + Horizon Docker container:

```
docker run --rm -it -p "8000:8000" --name stellar stellar/quickstart --testnet
```

See the official docs [here](https://github.com/stellar/docker-stellar-core-horizon)

## To run a community Stellar Core + Horizon Docker container:

```
docker run -it \
    --rm \
    --name horizon-integrationnet \
    -p 8000:8000 \
    zulucrypto/stellar-integration-test-network
```
Credit to zulucrypto. See the repo [here](https://github.com/zulucrypto/docker-stellar-integration-test-network)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

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
