exports.spawn = function(enemy, map) {
    var inputItems = map._input().split(" ");

    for (var i = 0; i < inputItems.length; i++) {
        enemy.stack.push(parseFloat(inputItems[i]));
    }
};
exports.encounter = function() { };
exports.run = function(enemy, map) { };