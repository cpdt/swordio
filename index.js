var Procedure = require('./lib/Procedure');
var ProgramMap = require('./lib/ProgramMap');
var Enemy = require('./lib/Enemy');
var cells = require('./lib/cells');
var enemies = require('./lib/enemies');

exports.Procedure = Procedure;
exports.ProgramMap = ProgramMap;
exports.Enemy = Enemy;
exports.cells = cells;
exports.enemies = enemies;

exports.createMap = function(str) {
    return ProgramMap.fromString(str);
};

exports.createProcedure = function(str) {
    return new Procedure(exports.createMap(str));
};

exports.run = function(str, input) {
    return exports.createProcedure(str).run(input);
};