function MorphCell(map) {
    this.map = map;
}
MorphCell.type = "*";

MorphCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    enemy.type = this.map.get(targetX, targetY).type;

    enemy.x = targetX;
    enemy.y = targetY;
};

module.exports = MorphCell;