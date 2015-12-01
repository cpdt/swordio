var util = require('../util');

function ForwardDeflectorCell(map) {
    this.map = map;
}
ForwardDeflectorCell.type = "/";

ForwardDeflectorCell.prototype.encounter = function(enemy, vector) {
    // rotate counterclockwise
    enemy.direction--;
    if (enemy.direction < 0) enemy.direction = 3;

    var newVector = util.directionVectors[enemy.direction];
    enemy.x = this.x + newVector.x;
    enemy.y = this.y + newVector.y;
};

module.exports = ForwardDeflectorCell;