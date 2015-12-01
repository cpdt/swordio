function ShaveCell(map) {
    this.map = map;
}
ShaveCell.type = "-";

ShaveCell.prototype.encounter = function(enemy, vector) {
    var newNumberType = enemy.type.charCodeAt(0) - 1;
    if (newNumberType < 32) enemy.kill();
    enemy.type = String.fromCharCode(newNumberType);

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = ShaveCell;