function PullCell(map) {
    this.map = map;
}
PullCell.type = "<";

PullCell.prototype.encounter = function(enemy, vector) {
    var targetX = this.x + vector.x;
    var targetY = this.y + vector.y;

    var moveDirection = { x: vector.x * -1, y: vector.y * -1 };

    // find the positions to move from
    var currentX = targetX;
    var currentY = targetY;

    var moveFrom = [];

    while (currentX >= 0 && currentY < this.map.width && currentY >= 0 && currentY < this.map.height) {
        var cell = this.map.get(currentX, currentY);

        if (cell.type === " ") break;
        moveFrom.push(cell);

        currentX += vector.x;
        currentY += vector.y;
    }

    // skip the first cell, since we want to overwrite it
    for (var i = 1; i < moveFrom.length; i++) {
        var item = moveFrom[i];
        this.map.setCell(item.x + moveDirection.x, item.y + moveDirection.y, item);
    }

    // move all enemies in the region
    for (var z = 0; z < this.map.enemies.length; z++) {
        var mapEnemy = this.map.enemies[z];
        if (mapEnemy.x >= targetX && mapEnemy.x < currentX && mapEnemy.y >= targetY && mapEnemy.y < currentY) {
            mapEnemy.x += moveDirection.x;
            mapEnemy.y += moveDirection.y;
        }
    }

    this.map.set(currentX + moveDirection.x, currentY + moveDirection.y, " ");
    enemy.x = this.x;
    enemy.y = this.y;
};

module.exports = PullCell;