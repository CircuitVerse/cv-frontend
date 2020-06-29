/**
 * @jest-environment jsdom
 */
import { setup } from '../src/setup'
setup()
import load from '../src/data/load'
import * as data from './examples/fulladder.json'

jest
    .dontMock('fs');
describe('button', () => {
    it("loads without error", () => {
        load(data)
        // expect().not.toThrow()
    });
});