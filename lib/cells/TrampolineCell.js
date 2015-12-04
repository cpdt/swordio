function TrampolineCell(map) {
    this.map = map;
}
TrampolineCell.type = "=";

TrampolineCell.prototype.encounter = function(enemy, vector) {
    var stringValue = this.map.get(this.x + vector.x, this.y + vector.y).type;
    var numberValue = stringValue.charCodeAt(0) - 31;

    enemy.x = this.x + vector.x * numberValue;
    enemy.y = this.y + vector.y * numberValue;
};

module.exports = TrampolineCell;