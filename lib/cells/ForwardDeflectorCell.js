var util = require('../util');

function ForwardDeflectorCell(map) {
    this.map = map;
}
ForwardDeflectorCell.type = "/";

ForwardDeflectorCell.prototype.encounter = function(enemy, vector) {
    switch (enemy.direction) {
        case 0: enemy.direction = 1; break;
        case 1: enemy.direction = 0; break;
        case 2: enemy.direction = 3; break;
        case 3: enemy.direction = 2; break;
    }

    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = ForwardDeflectorCell;