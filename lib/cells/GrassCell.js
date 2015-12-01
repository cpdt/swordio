function GrassCell(map) {
    this.map = map;
}
GrassCell.type = " ";

GrassCell.prototype.encounter = function(enemy, vector) {
    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = GrassCell;