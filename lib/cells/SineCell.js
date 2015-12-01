function SineCell(map) {
    this.map = map;
}
SineCell.type = "!";

SineCell.prototype.encounter = function(enemy, vector) {
    var sineValue = Math.sin(enemy.stack.pop());
    this.map.set(enemy.x, enemy.y, String.fromCharCode(sineValue + 32));

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = SineCell;