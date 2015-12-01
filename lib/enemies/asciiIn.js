exports.spawn = function(enemy, map) {
    var inputText = map._input();

    for (var i = 0; i < inputText.length; i++) {
        enemy.stack.push(inputText.charCodeAt(i) - 32);
    }
};
exports.encounter = function() { };
exports.run = function(enemy, map) { };