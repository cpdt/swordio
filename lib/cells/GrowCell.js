function GrowCell(map) {
    this.map = map;
}
GrowCell.type = "+";

GrowCell.prototype.encounter = function(enemy, vector) {
    enemy.type = String.fromCharCode(enemy.type.charCodeAt(0) + 1);

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = GrowCell;