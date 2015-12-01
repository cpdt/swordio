var util = require('./util');
var enemies = require('./enemies');

function Enemy(map, type, x, y) {
    this.map = map;

    this.type = type;
    this.direction = 2; // 0 is up, 1 is right, 2 is down, 3 is left
    this.stack = [];

    this.x = x;
    this.y = y;

    this.isAlive = true;

    if (enemies[this.type]) enemies[this.type].spawn(this, map);
}

Enemy.prototype.tick = function() {
    if (!this.isAlive) return;

    // find the cell I am facing towards
    var vector = util.directionVectors[this.direction];

    if (enemies[this.type]) enemies[this.type].encounter(this, vector, this.map);

    var cell = this.map.get(this.x + vector.x, this.y + vector.y);
    cell.encounter(this, vector);

    if (this.y >= this.map.height - 1) {
        if (enemies[this.type]) enemies[this.type].run(this, this.map);
        this.kill();
    }
};

Enemy.prototype.kill = function() {
    if (!this.isAlive) return;

    //var mapIndex = this.map.enemies.indexOf(this);
    //if (mapIndex !== -1) this.map.enemies.splice(mapIndex, 1);

    this.isAlive = false;
};

module.exports = Enemy;