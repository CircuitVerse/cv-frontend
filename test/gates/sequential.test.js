/**
 * @jest-environment jsdom
 */
import { setup } from '../../src/setup'
setup()
import Input from '../../src/modules/Input'
import { update, updateSimulationSet } from '../../src/engine'
import Dlatch from '../../src/sequential/Dlatch';
import DflipFlop from '../../src/sequential/DflipFlop';
import TflipFlop from '../../src/sequential/TflipFlop';
import SRflipFlop from '../../src/sequential/SRflipFlop';
import JKflipFlop from '../../src/sequential/JKflipFlop';

/*
 * Dlatch test
 */
describe('Dlatch works', () => {
    /*
    * basic setup
    */
    const a = new Dlatch(40, 40);
    const c = a.nodeList[0]
    const d = a.nodeList[1]
    const q = a.nodeList[2]
    const i1 = new Input(10, 30);
    i1.output1.connect(d);
    d.connect(i1.output1);
    it('draws right', () => {
        i1.state = 0
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
    });
    it('value of q', () => {
        i1.state = 1
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(1)
    });
})

/*
 * DflipFlop test
 */
describe('DflipFlop works', () => {
    /*
    * basic setup
    */
    const a = new DflipFlop(40, 40);
    const c = a.nodeList[0]
    const d = a.nodeList[1]
    const q = a.nodeList[2]
    const i1 = new Input(10, 30);
    i1.output1.connect(d);
    d.connect(i1.output1);
    it('draws right', () => {
        i1.state = 0
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
    });
    it('value of q', () => {
        i1.state = 1
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(1)
    });
})

/*
 * TflipFlop test
 */
describe('TflipFlop works', () => {
    /*
    * basic setup
    */
    const a = new TflipFlop(40, 40);
    const c = a.nodeList[0]
    const t = a.nodeList[1]
    const q = a.nodeList[2]
    const i1 = new Input(10, 30);
    i1.output1.connect(t);
    t.connect(i1.output1);
    it('draws right', () => {
        i1.state = 0
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        expect(q.value).toEqual(0)
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
    });
    it('value of T', () => {
        i1.state = 1
        c.value = 0
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(1)
        c.value = 0
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(1)
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
    });
})

/*
 * SRflipFlop test
 */
describe('SRflipFlop works', () => {
    /*
    * basic setup
    */
    const a = new SRflipFlop(40, 40);
    const r = a.nodeList[0]
    const s = a.nodeList[1]
    const q = a.nodeList[2]
    const i1 = new Input(10, 30);
    const i2 = new Input(20, 40);
    i1.output1.connect(s);
    s.connect(i1.output1);
    i2.output1.connect(r);
    r.connect(i2.output1);
    it('1 0 sr logic', () => {
        i1.state = 1
        i2.state = 0
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(1)
    });
    it('0 1 sr logic', () => {
        i1.state = 0
        i2.state = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
    });
    it('value of q with 0,0 sr logic', () => {
        i1.state = 0
        i2.state = 0
        const state = q.value
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(+state)
    });
})

/*
 * JKflipFlop test
 */
describe('JKflipFlop works', () => {
    /*
    * basic setup
    */
    const a = new JKflipFlop(40, 40);
    const j = a.nodeList[0]
    const k = a.nodeList[1]
    const c = a.nodeList[2]
    const q = a.nodeList[3]
    const i1 = new Input(10, 30);
    const i2 = new Input(10, 50);
    i1.output1.connect(j);
    j.connect(i1.output1);
    i2.output1.connect(k);
    k.connect(i2.output1);
    it('0 1 jk logic', () => {
        i1.state = 1
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        expect(q.value).toEqual(0)
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(1)
    });
    it('1 0 jk logic', () => {
        i2.state = 1
        c.value = 0
        updateSimulationSet(true)
        update()
        c.value = 1
        expect(q.value).toEqual(1)
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(0)
    });
    it('value of q with 1,1 jk', () => {
        i1.state = 1
        i2.state = 1
        c.value = 0
        const state = q.value
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(+state)
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(+!state)
        c.value = 0
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(+!state)
        c.value = 1
        updateSimulationSet(true)
        update()
        expect(q.value).toEqual(+state)
    });
})
