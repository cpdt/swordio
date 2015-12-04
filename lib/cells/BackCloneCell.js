var util = require('../util');
var Enemy = require('../Enemy');

function BackCloneCell(map) {
    this.map = map;
}
BackCloneCell.type = "{";

BackCloneCell.prototype.encounter = function(enemy, vector) {
    var newDirection = 3 - enemy.direction;

    var newEnemy = new Enemy(this.map, enemy.type, this.x, this.y);
    newEnemy.direction = newDirection;
    newEnemy.stack = enemy.stack.slice();
    this.map.enemies.push(newEnemy);
    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = BackCloneCell;