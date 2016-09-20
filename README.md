# inFlights

## Table of Contents

- [Setup](#setup)
- [Installation](#installation)
- [Development](#development)
- [Build](#build--buildproduction)
- [Deployment](#deployment)

## Setup
1. Clone project
2. Install node
     * Ubuntu

       ```
       $ sudo apt-get update
       $ sudo apt-get install nodejs
       ```

     * Window

      Download node installer from [here](https://nodejs.org/en/download/)

## Installation
```
$ git clone git@github.com:ajayy004/react-bootstrap.git
$ cd react-bootstrap
$ npm install
```
## Development
```
$ npm start
or
$ npm start --PORT=3008 --NODE_ENV="dev"
```
Runs the project in development mode with hot-reloading of `app` folder.
Open your browser at [http://localhost:3000](http://localhost:3000).

## Clean
```
$ npm run clean
```
Using rimraf clean the `build` folder, which is the target of the `build`


## Build & build:production
```
$ npm run build
```
Builds the app into the 'build' folder for deployment
```
$ npm run build:production
```
clean the `build` folder and rebuilds the app for deployment


# Deployment

make sure the ssh key of the test/staging etc is set for the deployment server.

  ```
  npm run deploy --SERVER_USER={user_name} --SERVER_IP={destination_server_address} --SERVER_DESTINATION={destination_path}
  `


### Import user.yml settings in sublime
   * Rename user.yml.example to user.yml
   * Open Sublime, Go to -> "Preferences > settings-user" and import the user.yml

#### Why [webpack](https://webpack.github.io/)?
A good single-page application should be maintainable, reliable, and efficient. Webpack is a powerful tool to build, because:
   * It manages modules and their dependencies and transforms static assets to build bundles
   * It creates the same build bundles in development and production for consistency
   * It controls multiple application entry points or sections, and provides common bundles among them. Other unique bundles for each section can be loaded on-demand.
   * It can version assets per file — for example, appending a unique hash to the file name (i.e. bundle.sd2fdds34.js). This makes it easy to cache the assets. It also supports live updates (hot module replacement) during development.

#### Why [Babel](https://babeljs.io/)?
Babel is a essentially an ECMAScript 6 to ECMAScript 5 compiler. It allows you to use ES6 features in your projects and then compiles ES5 for you to use in production.
