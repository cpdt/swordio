function TangentCell(map) {
    this.map = map;
}
TangentCell.type = "#";

TangentCell.prototype.encounter = function(enemy, vector) {
    var sineValue = Math.tan(enemy.stack.pop());
    this.map.set(enemy.x, enemy.y, String.fromCharCode(sineValue + 32));

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = TangentCell;