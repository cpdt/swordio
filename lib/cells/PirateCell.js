function PirateCell(map) {
    this.map = map;
}
PirateCell.type = "G";

PirateCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var topItem = enemy.stack[enemy.stack.length - 1];
    var targetNumber = this.map.get(targetX, targetY).type.charCodeAt(0);

    if (topItem > targetNumber) {
        enemy.x = targetX;
        enemy.y = targetY;
    } else enemy.kill();
};

module.exports = PirateCell;