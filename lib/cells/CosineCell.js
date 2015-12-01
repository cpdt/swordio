function CosineCell(map) {
    this.map = map;
}
CosineCell.type = "@";

CosineCell.prototype.encounter = function(enemy, vector) {
    var sineValue = Math.cos(enemy.stack.pop());
    this.map.set(enemy.x, enemy.y, String.fromCharCode(sineValue + 32));

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = CosineCell;