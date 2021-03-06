'use strict';

import {
  App
} from './app';

import './index.css';

/**
 * The main application entry point.
 */
function main(): void {
  let app = new App();
  (<any>window).app = app;
}

window.onload = main;
