function PeekCell(map) {
    this.map = map;
}
PeekCell.type = ".";

PeekCell.prototype.encounter = function(enemy, vector) {
    var numberValue = enemy.stack[enemy.stack.length - 1];
    var stringValue = String.fromCharCode(numberValue + 32);

    this.map.set(enemy.x, enemy.y, stringValue);

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = PeekCell;