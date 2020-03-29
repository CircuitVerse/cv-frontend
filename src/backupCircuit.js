export function scheduleBackup(scope = globalScope) {

    var backup = JSON.stringify(backUp(scope));
    if (scope.backups.length == 0 || scope.backups[scope.backups.length - 1] != backup) {
        scope.backups.push(backup);
        scope.timeStamp = new Date().getTime();
        projectSaved = false;
    }

    return backup;
}
export function backUp(scope = globalScope) {

    // Disconnection of subcircuits are needed because these are the connections between nodes
    // in current scope and those in the subcircuit's scope
    for (let i = 0; i < scope.SubCircuit.length; i++)
        scope.SubCircuit[i].removeConnections();

    var data = {};

    // Storing layout
    data["layout"] = scope.layout;

    // Storing all nodes
    data["allNodes"] = scope.allNodes.map(extract);

    // Storing other details
    data["id"] = scope.id;
    data["name"] = scope.name;

    // Storing details of all module objects
    for (var i = 0; i < moduleList.length; i++) {
        if (scope[moduleList[i]].length)
            data[moduleList[i]] = scope[moduleList[i]].map(extract);
    }

    // Adding restricted circuit elements used in the save data
    data["restrictedCircuitElementsUsed"] = scope.restrictedCircuitElementsUsed;

    // Storing intermediate nodes (nodes in wires)
    data["nodes"] = []
    for (var i = 0; i < scope.nodes.length; i++)
        data["nodes"].push(scope.allNodes.indexOf(scope.nodes[i]));

    // Restoring the connections
    for (let i = 0; i < scope.SubCircuit.length; i++)
        scope.SubCircuit[i].makeConnections();

    return data
}
function extract(obj) {
    return obj.saveObject();
}
