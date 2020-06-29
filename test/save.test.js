/**
 * @jest-environment jsdom
 */
import { setup } from '../src/setup'
setup()
import load from '../src/data/load'
import * as data from './examples/fulladder.json'
import Input from '../src/modules/Input'
import save from '../src/data/save';

jest
    .dontMock('fs');
describe('button', () => {
    it("Draw right without error", () => {
        load(data)
        window.logix_project_id = data.projectId
        new Input(10,20);
        expect(save).not.toThrow()
    });
});