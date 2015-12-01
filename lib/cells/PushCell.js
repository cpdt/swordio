function PushCell(map) {
    this.map = map;
}
PushCell.type = ">";

PushCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    // find the positions to move from
    var currentX = targetX;
    var currentY = targetY;

    var moveFrom = [];

    while (currentX >= 0 && currentX < this.map.width && currentY >= 0 && currentY < this.map.height) {
        var cell = this.map.get(currentX, currentY);

        if (cell.type === " ") break;
        moveFrom.push(cell);

        currentX += vector.x;
        currentY += vector.y;
    }

    for (var i = moveFrom.length - 1; i >= 0; i--) {
        var item = moveFrom[i];
        this.map.setCell(item.x + vector.x, item.y + vector.y, item);
    }

    // move all enemies in the region
    for (var z = 0; z < this.map.enemies.length; z++) {
        var mapEnemy = this.map.enemies[z];
        if (mapEnemy.x >= targetX && mapEnemy.x < currentX && mapEnemy.y >= targetY && mapEnemy.y < currentY) {
            mapEnemy.x += vector.x;
            mapEnemy.y += vector.y;
        }
    }

    this.map.set(targetX, targetY, " ");
    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = PushCell;