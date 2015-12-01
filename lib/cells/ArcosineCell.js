function ArcosineCell(map) {
    this.map = map;
}
ArcosineCell.type = "%";

ArcosineCell.prototype.encounter = function(enemy, vector) {
    var sineValue = Math.acos(enemy.stack.pop());
    this.map.set(enemy.x, enemy.y, String.fromCharCode(sineValue + 32));

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = ArcosineCell;