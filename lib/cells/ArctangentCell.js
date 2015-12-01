function ArctangentCell(map) {
    this.map = map;
}
ArctangentCell.type = "%";

ArctangentCell.prototype.encounter = function(enemy, vector) {
    var sineValue = Math.atan(enemy.stack.pop());
    this.map.set(enemy.x, enemy.y, String.fromCharCode(sineValue + 32));

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = ArctangentCell;