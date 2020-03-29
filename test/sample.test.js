/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

const $ = global.jQuery = global.$ = require('jquery');

document.documentElement.innerHTML = html.toString();

require('jquery-ui-bundle');

import { setup } from '../src/circuit'
import { AndGate } from '../src/module'
import { Array } from '../src/arrayHelpers'
import { updateRestrictedElementsInScope } from '../src/restrictedElementDiv'
window["Array"] = Array

jest
    .dontMock('fs');
describe('button', function () {    
    it("validates that an restricted element is normal at first", function () {
        window.restrictedElements = []
        setup()
        expect(($('#restrictedElementsDiv--list').text())).toEqual(" ")
    });
    it("validates that an restricted element is shown in restricted items div when it is used", function () {
        window.restrictedElements = ["AndGate"]
        setup()
        new AndGate(40, 40)
        updateRestrictedElementsInScope()
        expect(($('#restrictedElementsDiv--list').text())).toEqual("AndGate")
    });
});
