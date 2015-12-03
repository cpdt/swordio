function PeacefulNinjaCell(map) {
    this.map = map;
}
PeacefulNinjaCell.type = "N";

PeacefulNinjaCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var stringValue = this.map.get(targetX, targetY).type;
    var numberValue = stringValue.charCodeAt(0);

    if (numberValue > 32) {
        enemy.x = targetX;
        enemy.y = targetY;

        this.map.set(targetX, targetY, String.fromCharCode(numberValue - 1));
    } else enemy.kill();
};

module.exports = PeacefulNinjaCell;