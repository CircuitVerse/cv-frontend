import { Scope } from "./circuit";
import { dots } from "./canvasApi";
import { showProperties } from "./ux";

window.scopeList = {}
window.globalScope = undefined
window.unit = 10; // size of each division/ not used everywhere, to be deprecated
window.uniqueIdCounter = 10; // size of each division/ not used everywhere, to be deprecated
window.embed = false
window.wireToBeChecked = 0; // when node disconnects from another node
window.willBeUpdated = false; // scheduleUpdate() will be called if true
window.objectSelection = false; // Flag for object selection
window.errorDetected = false; // Flag for error detection

window.prevErrorMessage = undefined; // Global variable for error messages
window.prevShowMessage = undefined; // Global variable for error messages

window.updatePosition = true; // Flag for updating position
window.updateSimulation = true; // Flag for updating simulation
window.updateCanvas = true; // Flag for rendering

window.gridUpdate = true; // Flag for updating grid
window.updateSubcircuit = true; // Flag for updating subCircuits

window.loading = false; // Flag - all assets are loaded

window.DPR = 1; // devicePixelRatio, 2 for retina displays, 1 for low resolution displays

window.projectSaved = true; // Flag for project saved or not
window.canvasMessageData = undefined; //  Globally set in draw fn ()

window.lightMode = false; // To be deprecated

window.layoutMode = false; // Flag for mode

window.forceResetNodes = true; // FLag to reset all Nodes


export function generateId() {
    var id = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++)
        id += possible.charAt(Math.floor(Math.random() * possible.length));

    return id;
}

export function newCircuit(name, id) {
    name = name || prompt("Enter circuit name:");
    name = stripTags(name);
    if (!name) return;
    const scope = new Scope(name);
    if (id) scope.id = id;
    scopeList[scope.id] = scope;
    window.globalScope = scope;

    $('.circuits').removeClass("current");
    $('#tabsBar').append("<div class='circuits toolbarButton current' id='" + scope.id + "'>" + name + "</div>");
    $('.circuits').click(function () {
        switchCircuit(this.id)
    });
    if (!embed) {
        showProperties(scope.root);
    }

    dots(true, false);

    return scope;
}

// To strip tags from input
export function stripTags(string = "") {
    return string.replace(/(<([^>]+)>)/ig, '').trim();
}


export function clockTick() {
    if (!simulationArea.clockEnabled) return;
    if (errorDetected) return;
    updateCanvas = true;
    globalScope.clockTick();
    play();
    scheduleUpdate(0, 20);

}
// Helper function to show message
export function showMessage(mes) {
    if (mes == prevShowMessage) return;
    prevShowMessage = mes
    var id = Math.floor(Math.random() * 10000);
    $('#MessageDiv').append("<div class='alert alert-success' role='alert' id='" + id + "'> " + mes + "</div>");
    setTimeout(function () {
        prevShowMessage = undefined;
        $('#' + id).fadeOut()
    }, 2500);
}

export function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}


