function RockCell(map) {
    this.map = map;
}
RockCell.type = "B";

RockCell.prototype.encounter = function(enemy, vector) {
    // do nothing
};

module.exports = RockCell;