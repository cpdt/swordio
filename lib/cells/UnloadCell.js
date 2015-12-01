function UnloadCell(map) {
    this.map = map;
}
UnloadCell.type = "^";

UnloadCell.prototype.encounter = function(enemy, vector) {
    var numberValue = enemy.stack.pop();
    var stringValue = String.fromCharCode(numberValue + 32);

    this.map.set(enemy.x, enemy.y, stringValue);

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = UnloadCell;