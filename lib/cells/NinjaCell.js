function NinjaCell(map) {
    this.map = map;
}
NinjaCell.type = "J";

NinjaCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var enemyNumber = enemy.type.charCodeAt(0);
    var targetNumber = this.map.get(targetX, targetY).type.charCodeAt(0);

    if (enemyNumber > targetNumber) {
        enemy.x = targetX;
        enemy.y = targetY;
    } else enemy.kill();
};

module.exports = NinjaCell;