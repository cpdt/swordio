function AccountantCell(map) {
    this.map = map;
}
AccountantCell.type = "C";

AccountantCell.prototype.encounter = function(enemy, vector) {
    var newValue = String.fromCharCode(enemy.stack.length + 32);
    this.map.set(enemy.x, enemy.y, newValue);

    enemy.x += vector.x;
    enemy.y += vector.y;
};

module.exports = AccountantCell;