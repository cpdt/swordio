var util = require('../util');

function FlimsyForwardDeflectorCell(map) {
    this.map = map;
}
FlimsyForwardDeflectorCell.type = ")";

FlimsyForwardDeflectorCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var stringValue = this.map.get(targetX, targetY).type;
    var numberValue = stringValue.charCodeAt(0) - 32;

    switch (enemy.direction) {
        case 0: enemy.direction = 1; break;
        case 1: enemy.direction = 0; break;
        case 2: enemy.direction = 3; break;
        case 3: enemy.direction = 2; break;
    }

    enemy.x = this.x;
    enemy.y = this.y;

    this.map.set(targetX, targetY, String.fromCharCode(numberValue + 31));

    if (numberValue <= 1) this.map.set(this.x, this.y, " ");
};

module.exports = FlimsyForwardDeflectorCell;