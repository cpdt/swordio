var util = require('../util');
var Enemy = require('../Enemy');

function BackCloneCell(map) {
    this.map = map;
}
BackCloneCell.type = "}";

BackCloneCell.prototype.encounter = function(enemy, vector) {
    var newDirection = enemy.direction - 1;
    if (newDirection > 3) newDirection = 0;

    var newEnemy = new Enemy(this.map, enemy.type, this.x, this.y);
    newEnemy.direction = newDirection;
    this.map.enemies.push(newEnemy.direction);
    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = BackCloneCell;