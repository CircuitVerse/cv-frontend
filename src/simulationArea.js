import { width, height } from "./circuit";
import EventQueue from "./eventQueue"
import { clockTick } from "./utils";
export var simulationArea = {
    canvas: document.getElementById("simulationArea"),
    selected: false,
    hover: false,
    clockState: 0,
    clockEnabled: true,
    lastSelected: undefined,
    stack: [],
    prevScale: 0,
    oldx: 0,
    oldy: 0,
    objectList: [],
    maxHeight: 0,
    maxWidth: 0,
    minHeight: 0,
    minWidth: 0,
    multipleObjectSelections: [],
    copyList: [],
    shiftDown: false,
    controlDown: false,
    timePeriod: 500,
    mouseX: 0,
    mouseY: 0,
    mouseDownX: 0,
    mouseDownY: 0,
    simulationQueue: undefined,

    clickCount: 0, //double click
    lock: "unlocked",
    timer: function () {
        ckickTimer = setTimeout(function () {
            simulationArea.clickCount = 0;
        }, 600);
    },

    setup: function () {
        this.canvas = document.getElementById("simulationArea"),
        this.canvas.width = width;
        this.canvas.height = height;
        this.simulationQueue = new EventQueue(10000);
        this.context = this.canvas.getContext("2d");
        simulationArea.changeClockTime(simulationArea.timePeriod)
        this.mouseDown = false;
    },
    changeClockTime: function (t) {
        if (t < 50) return;
        clearInterval(simulationArea.ClockInterval);
        t = t || prompt("Enter Time Period:");
        simulationArea.timePeriod = t;
        simulationArea.ClockInterval = setInterval(clockTick, t);
    },
    clear: function () {
        if (!this.context) return;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

const changeClockTime = simulationArea.changeClockTime
