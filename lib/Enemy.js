var util = require('./util');
var enemies = require('./enemies');

var currentId = 0;

function Enemy(map, type, x, y) {
    this.map = map;

    this.type = type;
    this.direction = 2; // 0 is up, 1 is right, 2 is down, 3 is left
    this.stack = [];

    this.x = x;
    this.y = y;

    this.id = currentId++;

    this.isAlive = true;

    if (enemies[this.type]) enemies[this.type].spawn(this, map);
}

Enemy.prototype.tick = function() {
    if (!this.isAlive) return;

    // find the cell I am facing towards
    var vector = util.directionVectors[this.direction];

    if (enemies[this.type]) enemies[this.type].encounter(this, vector, this.map);

    var newX = this.x + vector.x;
    var newY = this.y + vector.y;

    if (newY >= this.map.height) {
        if (enemies[this.type]) enemies[this.type].run(this, this.map);
        this.kill();
    } else {
        var cell = this.map.get(newX, newY);
        cell.encounter(this, vector);
    }
};

Enemy.prototype.kill = function() {
    if (!this.isAlive) return;

    this.isAlive = false;
};

module.exports = Enemy;