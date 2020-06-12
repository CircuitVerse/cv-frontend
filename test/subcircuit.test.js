/**
 * @jest-environment jsdom
 */
import { setup } from '../src/setup'
setup()
import load from '../src/data/load'
import * as data from './examples/fulladder.json'
import { updateSimulationSet, update } from '../src/engine';

jest
    .dontMock('fs');
describe('button', () => {
    it("Draw right without error", () => {
        load(data)
        // expect().not.toThrow()
    });
    const bools = [[0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 1, 1], [1, 0, 0], [1, 0, 1], [1, 1, 0], [1, 1, 1]]
    it.each(bools)("logic works", (val1,val2,val3) => {
        const i1 = globalScope.Input[0];
        const i2 = globalScope.Input[1];
        const i3 = globalScope.Input[2];
        const cout = globalScope.Output[1];
        const sum = globalScope.Output[0];
        i1.state = val1
        i2.state = val2
        i3.state = val3
        updateSimulationSet(true);
        update();
        expect([cout.inp1.value, sum.inp1.value]).toEqual([(val1 & val2) | (val3 & val2) | (val1 & val3),val1^val2^val3])
    });
});
