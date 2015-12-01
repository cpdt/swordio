function WeakTrampolineCell(map) {
    this.map = map;
}
WeakTrampolineCell.type = "~";

WeakTrampolineCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var stringValue = this.map.get(targetX, targetY).type;
    var numberValue = stringValue.charCodeAt(0) - 32;

    enemy.x = this.x + vector.x * numberValue;
    enemy.y = this.y + vector.y * numberValue;

    if (numberValue === 0) this.map.set(this.x, this.y, " ");
    else this.map.set(targetX, targetY, String.fromCharCode(numberValue + 31));
};

module.exports = WeakTrampolineCell;