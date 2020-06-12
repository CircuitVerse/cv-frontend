/**
 * @jest-environment jsdom
 */
import { setup } from '../../src/setup'
setup()
import AndGate from '../../src/modules/AndGate'
import Input from '../../src/modules/Input'
import { update, updateSimulationSet } from '../../src/engine'

describe('and gate works', () => {
    /*
     * basic setup
     */
    const a = new AndGate(40,40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10,30);
    const i2 = new Input(10,50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {
        
    })
    var bools = [[0,0],[0,1],[1,0],[1,1]];
    it.each(bools)("logic works", (val1,val2) => {
        console.log(val1,val2)
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val1&val2);
    })
});
