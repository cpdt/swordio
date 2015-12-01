function PeacefulNinjaCell(map) {
    this.map = map;
}
PeacefulNinjaCell.type = "N";

PeacefulNinjaCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var stringValue = this.map.get(targetX, targetY).type;
    var numberValue = stringValue.charCodeAt(0) - 32;

    if (numberValue > 0) {
        enemy.x = targetX;
        enemy.y = targetY;
    } else enemy.kill();
};

module.exports = PeacefulNinjaCell;