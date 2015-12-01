exports.spawn = function(enemy, map) { };
exports.encounter = function() { };
exports.run = function(enemy, map) {
    map._output(enemy.stack.join(" "));
};