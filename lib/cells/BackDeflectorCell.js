var util = require('../util');

function BackDeflectorCell(map) {
    this.map = map;
}
BackDeflectorCell.type = "\\";

BackDeflectorCell.prototype.encounter = function(enemy, vector) {
    enemy.direction = 3 - enemy.direction;

    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = BackDeflectorCell;