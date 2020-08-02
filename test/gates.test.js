/**
 * @jest-environment jsdom
 */
import { setup } from '../src/setup'
setup()
import AndGate from '../src/modules/AndGate'
import OrGate from '../src/modules/OrGate';
import XnorGate from '../src/modules/XnorGate';
import XorGate from '../src/modules/XorGate';
import NandGate from '../src/modules/NandGate';
import NorGate from '../src/modules/NorGate';
import NotGate from '../src/modules/NotGate';
import Input from '../src/modules/Input'
import { update, updateSimulationSet } from '../src/engine'

/*
 * AndGate test
 */
describe('AndGate works', () => {
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
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val1&val2);
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});

/*
 * OrGate test
 */
describe('OrGate works', () => {
    /*
     * basic setup
     */
    const a = new OrGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val1 | val2);
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});

/*
 * XorGate test
 */
describe('XorGate works', () => {
    /*
     * basic setup
     */
    const a = new XorGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val1 ^ val2);
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});


/*
 * XorGate test
 */
describe('XorGate works', () => {
    /*
     * basic setup
     */
    const a = new XorGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toBe(val1 ^ val2);
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});

/*
 * XnorGate test
 */
describe('XnorGate works', () => {
    /*
     * basic setup
     */
    const a = new XnorGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toEqual(+!(val1 ^ val2));
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});


/*
 * NorGate test
 */
describe('NorGate works', () => {
    /*
     * basic setup
     */
    const a = new NorGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toEqual(+!(val1 | val2));
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});


/*
 * NandGate test
 */
describe('NandGate works', () => {
    /*
     * basic setup
     */
    const a = new NandGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const n3 = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    i2.output1.connect(n2);
    n2.connect(i2.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [[0, 0], [0, 1], [1, 0], [1, 1]];
    it.each(bools)("logic works", (val1, val2) => {
        i1.state = val1
        i2.state = val2
        updateSimulationSet(true);
        update();
        expect(n3.value).toEqual(+!(val1 & val2));
    })
    it('can change input node', () => {
        const x = a.changeInputSize(3)
        expect(x.inp.length).toBe(3)
    });
});


/*
 * NotGate test
 */
describe('NotGate works', () => {
    /*
     * basic setup
     */
    const a = new NotGate(40, 40);
    const n1 = a.nodeList[0]
    const n2 = a.nodeList[1]
    const i1 = new Input(10, 30);
    i1.output1.connect(n1);
    n1.connect(i1.output1);
    /*
     * test cases
     */
    it("draws correctly", () => {

    })
    var bools = [0,1];
    it.each(bools)("logic works", (val1) => {
        i1.state = val1
        updateSimulationSet(true);
        update();
        expect(n2.value).toEqual(+!(val1));
    })
});
