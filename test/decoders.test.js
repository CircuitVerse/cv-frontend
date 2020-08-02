/**
 * @jest-environment jsdom
 */
import { setup } from '../src/setup'
setup()
import Multiplexer from '../src/modules/Multiplexer'
import Demultiplexer from '../src/modules/Demultiplexer'
import Input from '../src/modules/Input'
import { update, updateSimulationSet } from '../src/engine'

/*
 * Multiplexer test
 */
describe('Multiplexer works', () => {
    /*
     * basic setup
     */
    const a = new Multiplexer(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const n4 = a.nodeList[3]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    const i3 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    i3.output1.connect(n4);
    n4.connect(i3.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works for control signal 1", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        i3.state = 1
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val2);
    })
    it.each(bools)("logic works for control signal 0", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        i3.state = 0
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val1);
    })
})

/*
 * Demultiplexer test
 */
describe('Demultiplexer works', () => {
    /*
     * basic setup
     */
    const a = new Demultiplexer(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const n4 = a.nodeList[3]
    const i1 = new Input(10, 30);
    const i3 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i3.output1.connect(n4);
    n4.connect(i3.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [0,1];
    it.each(bools)("logic works for control signal 1", (val1) => {
        i1.state = val1
        i3.state = 1
        updateSimulationSet(true);
        update();
        expect([n2.value,n3.value]).toEqual([0,val1]);
    })
    it.each(bools)("logic works for control signal 0", (val1) => {
        i1.state = val1
        i3.state = 0
        updateSimulationSet(true);
        update();
        expect([n2.value, n3.value]).toEqual([val1,0]);
    })
})