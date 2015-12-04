var util = require('../util');
var Enemy = require('../Enemy');

function BackCloneCell(map) {
    this.map = map;
}
BackCloneCell.type = "}";

BackCloneCell.prototype.encounter = function(enemy, vector) {
    var newDirection;
    switch (enemy.direction) {
        case 0: newDirection = 1; break;
        case 1: newDirection = 0; break;
        case 2: newDirection = 3; break;
        case 3: newDirection = 2; break;
    }

    var newEnemy = new Enemy(this.map, enemy.type, this.x, this.y);
    newEnemy.direction = newDirection;
    newEnemy.stack = enemy.stack.slice();
    this.map.enemies.push(newEnemy);
    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = BackCloneCell;