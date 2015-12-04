function SubtractCell(map) {
    this.map = map;
}
SubtractCell.type = "S";

SubtractCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var enemyValue = enemy.stack.pop();
    var cellValue = this.map.get(targetX, targetY).type.charCodeAt(0);

    this.map.set(enemy.x, enemy.y, String.fromCharCode(enemyValue - cellValue + 64));

    enemy.x = targetX;
    enemy.y = targetY;
};

module.exports = SubtractCell;