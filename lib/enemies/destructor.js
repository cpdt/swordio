exports.spawn = function(enemy, map) { };
exports.encounter = function(enemy, vector, map) {
    map.set(enemy.x + vector.x, enemy.y + vector.y, " ");
};
exports.run = function(enemy, map) { };