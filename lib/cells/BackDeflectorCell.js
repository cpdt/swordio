var util = require('../util');

function BackDeflectorCell(map) {
    this.map = map;
}
BackDeflectorCell.type = "\\";

BackDeflectorCell.prototype.encounter = function(enemy, vector) {
    // rotate clockwise
    enemy.direction++;
    if (enemy.direction > 3) enemy.direction = 0;

    var newVector = util.directionVectors[enemy.direction];
    enemy.x = this.x + newVector.x;
    enemy.y = this.y + newVector.y;
};

module.exports = BackDeflectorCell;