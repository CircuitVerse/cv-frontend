/**
 * @jest-environment jsdom
 */

global.window = window
window.Jquery = require('jquery');
window.$ = require('jquery');
global.jQuery = require('jquery');

window.restrictedElements = []
window.userSignedIn = true;
window.embed = false;

import Array from './src/arrayHelpers'
window["Array"] = Array
require('jquery-ui-bundle');

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
document.documentElement.innerHTML = html.toString();
