function ShieldCell(map) {
    this.map = map;
}
ShieldCell.type = "0";

ShieldCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var stringValue = this.map.get(targetX, targetY).type;
    var numberValue = stringValue.charCodeAt(0) - 32;

    this.map.set(targetX, targetY, String.fromCharCode(numberValue + 31));

    if (numberValue <= 1) this.map.set(this.x, this.y, " ");
};

module.exports = ShieldCell;