import $ from 'jquery';

window.$ = $
window.jQuery = $


require('jquery-ui-bundle');
// require('../node_modules/jquery-ui-dist!jquery-ui-dist/jquery-ui.css');
// require('../node_modules/jquery-ui-dist/jquery-ui.theme.css');

// jquery-ui theme
// require.context('file-loader?name=[path][name].[ext]&context=node_modules/jquery-ui-dist!jquery-ui-dist', true, /jquery-ui.css/);
// require.context('file-loader?name=[path][name].[ext]&context=node_modules/jquery-ui-dist!jquery-ui-dist', true, /jquery-ui\.theme\.css/);
// import 'jquery-ujs';
// var Turbolinks = require("turbolinks");
// Turbolinks.start();

// import 
import { setup } from './circuit'
import { AndGate } from './module'
import { Array } from './arrayHelpers'
window.setup = setup
window["AndGate"] = AndGate
window["Array"] = Array