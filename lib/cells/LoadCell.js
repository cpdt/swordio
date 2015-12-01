function LoadCell(map) {
    this.map = map;
}
LoadCell.type = "V";

LoadCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var stringValue = this.map.get(targetX, targetY).type;
    var numberValue = stringValue.charCodeAt(0) - 32;

    enemy.stack.push(numberValue);

    enemy.x = targetX;
    enemy.y = targetY;
};

module.exports = LoadCell;