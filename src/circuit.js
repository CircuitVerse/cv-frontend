import CircuitElement from "./circuitElement";
import * as metadata from './metadata.json'
import { generateId,newCircuit,showMessage } from "./utils";
import { backgroundArea } from "./backgroundArea";
import { plotArea } from "./plotArea";
import { simulationArea } from "./simulationArea";
import { dots } from "./canvasApi";
import { update } from "./engine";
import { setupUI } from "./ux";
import { startListeners } from "./listeners";
function setupEnvironment() {
    
    const projectId = generateId();
    const updateSimulation = true;
    const DPR = window.devicePixelRatio || 1;
    newCircuit("Main");
    
    window.data = {}
    resetup();
}
var width
var height
export {
    width,
    height
}
export function hello() {
    console.log("hello")
}
//to resize window and setup things
function resetup() {
    
    DPR = window.devicePixelRatio || 1;
    if (lightMode)
    DPR = 1;
    width = document.getElementById("simulationArea").clientWidth * DPR;
    if (!embed) {
        height = (document.getElementById("simulation").clientHeight ) * DPR;
    } else {
        height = (document.getElementById("simulation").clientHeight) * DPR;
    }
    
    //setup simulationArea
    backgroundArea.setup();
    if (!embed) plotArea.setup();
    simulationArea.setup();
    
    // update();
    dots();
    
    document.getElementById("backgroundArea").style.height = height / DPR + 100;
    document.getElementById("backgroundArea").style.width = width / DPR + 100;
    document.getElementById("canvasArea").style.height = height / DPR;
    simulationArea.canvas.width = width;
    simulationArea.canvas.height = height;
    backgroundArea.canvas.width = width + 100 * DPR;
    backgroundArea.canvas.height = height + 100 * DPR;
    if (!embed) {
        plotArea.c.width = document.getElementById("plot").clientWidth;
        plotArea.c.height = document.getElementById("plot").clientHeight
    }
    
    updateCanvas = true;
    update(); // INEFFICIENT, needs to be deprecated
    simulationArea.prevScale = 0;
    dots(true, false);
}

function setupElementLists() {
    
    $('#menu').empty();

    window.circuitElementList = metadata.circuitElementList;
    window.annotationList = metadata.annotationList;
    window.inputList = metadata.inputList;
    window.subCircuitInputList = metadata.subCircuitInputList;
    window.moduleList = [...circuitElementList, ...annotationList]
    window.updateOrder = ["wires", ...circuitElementList, "nodes", ...annotationList]; // Order of update
    window.renderOrder = [...(moduleList.slice().reverse()), "wires", "allNodes"]; // Order of render


    function createIcon(element) {
        return `<div class="icon logixModules" id="${element}" >
            <img src= "img/${element}.svg" >
            <p class="img__description">${element}</p>
        </div>`;
    }

    let elementHierarchy = metadata.elementHierarchy;
    for (let category in elementHierarchy) {
        let htmlIcons = '';

        let categoryData = elementHierarchy[category];

        for (let i = 0; i < categoryData.length; i++) {
            let element = categoryData[i];
            htmlIcons += createIcon(element);
        }

        let accordionData = `<div class="panelHeader">${category}</div>
            <div class="panel" style="overflow-y:hidden">
              ${htmlIcons}
            </div>`;

        $('#menu').append(accordionData);

    }


}

export function setup() {

    setupElementLists();
    setupEnvironment();
    if (!embed)
        setupUI();
    startListeners();
    projectName = "untitled"
    // Load project data after 1 second - needs to be improved, delay needs to be eliminated
    setTimeout(function () {
        if (logix_project_id != 0) {
            $('.loadingIcon').fadeIn();
            $.ajax({
                url: '/simulator/get_data',
                type: 'POST',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))
                },
                data: {
                    "id": logix_project_id
                },
                success: function (response) {
                    data = (response);

                    if (data) {
                        load(data);
                        simulationArea.changeClockTime(data["timePeriod"] || 500);
                    }
                    $('.loadingIcon').fadeOut();
                },
                failure: function () {
                    alert("Error: could not load ");
                    $('.loadingIcon').fadeOut();
                }
            });

        }

        // Restore unsaved data and save
        else if (localStorage.getItem("recover_login") && userSignedIn) {
            var data = JSON.parse(localStorage.getItem("recover_login"));
            load(data);
            localStorage.removeItem("recover");
            localStorage.removeItem("recover_login");
            save();
        }

        // Restore unsaved data which didn't get saved due to error
        else if (localStorage.getItem("recover")) {
            showMessage("We have detected that you did not save your last work. Don't worry we have recovered them. Access them using Project->Recover")
        }
    }, 1000);


}

export class Scope {
    constructor(name = "localScope", id = undefined) {
        this.restrictedCircuitElementsUsed = [];
        this.id = id || Math.floor((Math.random() * 100000000000) + 1);
        this.CircuitElement = [];

        //root object for referring to main canvas - intermediate node uses this
        this.root = new CircuitElement(0, 0, this, "RIGHT", 1);
        this.backups = [];
        this.timeStamp = new Date().getTime();

        this.ox = 0;
        this.oy = 0;
        this.scale = DPR;
        this.tunnelList = {};
        this.stack = []

        this.name = name;
        this.pending = []
        this.nodes = []; //intermediate nodes only
        this.allNodes = [];
        this.wires = [];

        // Creating arrays for other module elements
        for (var i = 0; i < moduleList.length; i++) {
            this[moduleList[i]] = [];
        }

        // Setting default layout
        this.layout = { // default position
            width: 100,
            height: 40,
            title_x: 50,
            title_y: 13,
            titleEnabled: true,
        }


        // FOR SOME UNKNOWN REASON, MAKING THE COPY OF THE LIST COMMON
        // TO ALL SCOPES EITHER BY PROTOTYPE OR JUST BY REFERNCE IS CAUSING ISSUES
        // The issue comes regarding copy/paste operation, after 5-6 operations it becomes slow for unknown reasons
        // CHANGE/ REMOVE WITH CAUTION
        // this.objects = ["wires", ...circuitElementList, "nodes", ...annotationList];
        // this.renderObjectOrder = [ ...(moduleList.slice().reverse()), "wires", "allNodes"];
    }

    // Resets all nodes recursively
    reset() {
        for (var i = 0; i < this.allNodes.length; i++)
            this.allNodes[i].reset();
        for (var i = 0; i < this.Splitter.length; i++) {
            this.Splitter[i].reset();
        }
        for (var i = 0; i < this.SubCircuit.length; i++) {
            this.SubCircuit[i].reset();
        }

    }

    // Adds all inputs to simulationQueue
    addInputs() {
        for (var i = 0; i < inputList.length; i++) {
            for (var j = 0; j < this[inputList[i]].length; j++) {
                simulationArea.simulationQueue.add(this[inputList[i]][j], 0);
            }
        }

        for (let j = 0; j < this.SubCircuit.length; j++)
            this.SubCircuit[j].addInputs();

    }

    // Ticks clocks recursively -- needs to be deprecated and synchronize all clocks with a global clock
    clockTick() {
        for (var i = 0; i < this.Clock.length; i++)
            this.Clock[i].toggleState(); //tick clock!
        for (var i = 0; i < this.SubCircuit.length; i++)
            this.SubCircuit[i].localScope.clockTick(); //tick clock!
    }

    // Checks if this circuit contains directly or indirectly scope with id
    // Recursive nature
    checkDependency(id) {
        if (id == this.id) return true;
        for (var i = 0; i < this.SubCircuit.length; i++)
            if (this.SubCircuit[i].id == id) return true;

        for (var i = 0; i < this.SubCircuit.length; i++)
            if (scopeList[this.SubCircuit[i].id].checkDependency(id)) return true;

        return false
    }

    // Get dependency list - list of all circuits, this circuit depends on
    getDependencies() {
        var list = []
        for (var i = 0; i < this.SubCircuit.length; i++) {
            list.push(this.SubCircuit[i].id);
            list.extend(scopeList[this.SubCircuit[i].id].getDependencies());
        }
        return uniq(list);
    }

    // helper function to reduce layout size
    fixLayout() {
        var max_y = 20;
        for (var i = 0; i < this.Input.length; i++)
            max_y = Math.max(this.Input[i].layoutProperties.y, max_y)
        for (var i = 0; i < this.Output.length; i++)
            max_y = Math.max(this.Output[i].layoutProperties.y, max_y)
        if (max_y != this.layout.height)
            this.layout.height = max_y + 10;
    }

    // Function which centers the circuit to the correct zoom level
    centerFocus(zoomIn = true) {
        if (layoutMode) return;
        findDimensions(this);
        var minX = simulationArea.minWidth || 0;
        var minY = simulationArea.minHeight || 0;
        var maxX = simulationArea.maxWidth || 0;
        var maxY = simulationArea.maxHeight || 0;

        var reqWidth = maxX - minX + 150;
        var reqHeight = maxY - minY + 150;

        this.scale = Math.min(width / reqWidth, height / reqHeight)

        if (!zoomIn)
            this.scale = Math.min(this.scale, DPR);
        this.scale = Math.max(this.scale, DPR / 10);

        this.ox = (-minX) * this.scale + (width - (maxX - minX) * this.scale) / 2;
        this.oy = (-minY) * this.scale + (height - (maxY - minY) * this.scale) / 2;
    }
}
