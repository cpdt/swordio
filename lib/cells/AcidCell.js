function AcidCell(map) {
    this.map = map;
}
AcidCell.type = "U";

AcidCell.prototype.encounter = function(enemy, vector) {
    enemy.kill();
};

module.exports = AcidCell;