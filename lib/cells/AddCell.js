function AddCell(map) {
    this.map = map;
}
AddCell.type = "A";

AddCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var enemyValue = enemy.stack.pop();
    var cellValue = this.map.get(targetX, targetY).type.charCodeAt(0);

    this.map.set(enemy.x, enemy.y, String.fromCharCode(enemyValue + cellValue));

    enemy.x = targetX;
    enemy.y = targetY;
};

module.exports = AddCell;