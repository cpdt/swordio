exports.spawn = function(enemy, map) { };
exports.encounter = function() { };
exports.run = function(enemy, map) {
    map._output(enemy.stack.map(function(item) {
        return String.fromCharCode(item + 32);
    }).join(""));
};