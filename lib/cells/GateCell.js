var gates = {};

var allGatesList = [];

function GateCell(map) {
    this.map = map;

    this.waitingIds = [];
}
GateCell.type = ":";

GateCell.prototype._removed = function() {
    var listIndex = allGatesList.indexOf(this);
    if (listIndex !== -1) allGatesList.splice(listIndex, 1);
};

GateCell.prototype._added = function() {
    var listIndex = allGatesList.indexOf(this);
    if (listIndex === -1) allGatesList.push(this);
};

GateCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
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

            if (gateCell.indexOf(gateId) === -1) {
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
    }
};

module.exports = GateCell;