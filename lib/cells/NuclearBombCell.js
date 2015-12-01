function NuclearBombCell(map) {
    this.map = map;
}
NuclearBombCell.type = "?";

NuclearBombCell.prototype.encounter = function(enemy, vector) {
    for (var i = 0; i < this.map.enemies.length; i++) {
        this.map.enemies[i].kill();
    }
};

module.exports = NuclearBombCell;