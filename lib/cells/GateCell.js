//var gates = [[], [], [], []];

var allGates = [];

function GateCell(map) {
    this.map = map;

    this.occupiedBy = [ false, false, false, false ];
    //this.scheduleClose = [ false, false, false, false ];
}
GateCell.type = ":";

GateCell.prototype._removed = function() {
    //var listIndex = allGatesList.indexOf(this);
    //if (listIndex !== -1) allGatesList.splice(listIndex, 1);

    var gateIndex = allGates.indexOf(this);
    if (gateIndex !== -1) allGates.splice(gateIndex, 1);
};

GateCell.prototype._added = function() {
    var gateIndex = allGates.indexOf(this);
    if (gateIndex === -1) allGates.push(this);
};

GateCell.prototype.encounter = function(enemy, vector) {
    if (this.occupiedBy[enemy.direction] && this.occupiedBy[enemy.direction] !== enemy) return enemy.kill();

    this.occupiedBy[enemy.direction] = enemy;

    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var gateId = this.map.get(targetX, targetY).type;

    var allOccupied = true;
    var occupiedGates = [];

    for (var i = 0; i < allGates.length; i++) {
        var gate = allGates[i];
        if (gate === this || this.map.get(gate.x + vector.x, gate.y + vector.y).type !== gateId) continue;

        if (gate.occupiedBy[enemy.direction]) occupiedGates.push(gate);
        else allOccupied = false;
    }

    if (allOccupied) {
        enemy.x = targetX;
        enemy.y = targetY;
        this.occupiedBy[enemy.direction] = false;

        for (var x = 0; x < occupiedGates.length; x++) {
            var occupiedGate = occupiedGates[x];
            var occupiedEnemy = occupiedGate.occupiedBy[enemy.direction];
            occupiedEnemy.x = occupiedGate.x + vector.x;
            occupiedEnemy.y = occupiedGate.y + vector.y;
            occupiedGate.occupiedBy[enemy.direction] = false;
        }
    }

    /*if (this.occupiedBy[enemy.direction] && this.occupiedBy[enemy.direction] !== enemy) return enemy.kill();

    this.occupiedBy[enemy.direction] = enemy;

    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var gateId = this.map.get(targetX, targetY).type;
    if (!gates[enemy.direction][gateId]) gates[enemy.direction][gateId] = { cells: [] };

    var gate = gates[enemy.direction][gateId];
    if (gate.cells.indexOf(this) === -1) gate.cells.push(this);

    var allGatesOccupied = true;
    for (var i = 0; i < gate.cells.length; i++) {
        var cell = gate.cells[i];
        if (!cell.occupiedBy[enemy.direction]) {
            allGatesOccupied = false;
            break;
        }
    }

    if (allGatesOccupied) {
        enemy.x = targetX;
        enemy.y = targetY;
        this.occupiedBy[enemy.direction] = false;
    }*/

    /*if (this.occupiedBy && this.occupiedBy !== enemy) return enemy.kill();

    this.occupiedBy = enemy;

    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var gateId = this.map.get(targetX, targetY).type;
    if (!gates[gateId]) gates[gateId] = { cells: [] };

    var gate = gates[gateId];
    if (gate.cells.indexOf(this) === -1) gate.cells.push(this);*/



    /*var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var gateId = this.map.get(targetX, targetY).type;

    if (!gates[gateId]) gates[gateId] = { open: false, enemies: [] };

    var gate = gates[gateId];
    if (gate.enemies.indexOf(enemy) === -1) gate.enemies.push(enemy);

    if (this.waitingIds.indexOf(gateId) === -1) this.waitingIds.push(gateId);

    if (!gate.open) {
        // find if all other gates are occupied
        var allOccupied = true;
        for (var i = 0; i < allGatesList.length; i++) {
            var gateCell = allGatesList[i];

            // does this gate have the correct ID?
            if (this.map.get(gateCell.x + vector.x, gateCell.y + vector.y).type !== gateId) continue;

            if (gateCell.waitingIds.indexOf(gateId) === -1) {
                allOccupied = false;
                break;
            }
        }

        gate.open = allOccupied;
    }

    if (gate.open) {
        enemy.x = targetX;
        enemy.y = targetY;

        var enemyIndex = gate.enemies.indexOf(enemy);
        if (enemyIndex !== -1) gate.enemies.splice(enemyIndex, 1);

        if (!gate.enemies.length) gate.open = false;
    }*/
};

module.exports = GateCell;