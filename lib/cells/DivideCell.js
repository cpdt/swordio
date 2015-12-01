function DivideCell(map) {
    this.map = map;
}
DivideCell.type = "D";

DivideCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var enemyValue = enemy.stack.pop();
    var cellValue = this.map[targetY][targetX].type.charCodeAt(0) - 32;

    this.map.set(enemy.x, enemy.y, String.fromCharCode(enemyValue / cellValue + 32));

    enemy.x = targetX;
    enemy.y = targetY;
};

module.exports = DivideCell;