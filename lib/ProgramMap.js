var cells = require('./cells');
var Enemy = require('./Enemy');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

function ProgramMap(cells, defs) {
    EventEmitter.call(this);

    this.definitions = defs;
    this.enemies = [
        //new Enemy(this, this.definitions[0], 0, 0)
    ];

    this.xOffset = 0;
    this.yOffset = 0;

    Object.defineProperties(this, {
        width: {
            get: function() {
                return this.cells[0].length;
            }.bind(this)
        },
        height: {
            get: function() {
                return this.cells.length;
            }.bind(this)
        }
    });

    // loop over each cell and create it
    var realCells = this.cells = [];
    for (var y = 0; y < cells.length; y++) {
        var cellRow = [];
        realCells.push(cellRow);
        for (var x = 0; x < cells[y].length; x++) {
            this.set(x, y, cells[y][x]);
        }
    }

    this.canSpawn = true;
    this.spawnState = 0;
    this.doSpawn();

    this.running = true;

    this._input = function() { };
    this._output = function() { };
}
util.inherits(ProgramMap, EventEmitter);

ProgramMap.prototype.tick = function() {
    this.emit('start tick');

    if (!this.running) return;

    var numberAlive = 0;

    var currentEnemyList = this.enemies.slice();
    for (var i = 0; i < currentEnemyList.length; i++) {
        var enemy = currentEnemyList[i];
        if (!enemy.isAlive) return;
        enemy.tick();

        if (enemy.isAlive) numberAlive++;
        else {
            var enemyListIndex = this.enemies.indexOf(enemy);
            if (enemyListIndex !== -1) this.enemies.splice(enemyListIndex, 1);
        }
    }

    if (!numberAlive) {
        this.running = false;
        return;
    }

    this.doSpawn();

    this.emit('end tick');
};

ProgramMap.prototype.doSpawn = function() {
    if (this.canSpawn) {
        // spawn a new enemy
        var enemyDefinition = this.definitions[this.spawnState];
        this.enemies.push(new Enemy(this, enemyDefinition, this.spawnState, -1));

        this.spawnState++;
        if (this.spawnState >= this.definitions.length) this.spawnState = 0;
    }
    this.canSpawn = !this.canSpawn;
};

ProgramMap.prototype.get = function(x, y) {
    var realX = x + this.xOffset;
    var realY = y + this.yOffset;

    this.autoExpand(realX, realY, "get at (" + x + "," + y + ")");

    return this.cells[realY][realX];
};

ProgramMap.prototype.autoExpand = function(x, y, reason) {
    var expansion = { top: 0, right: 0, bottom: 0, left: 0 };
    if (x < 0) expansion.left = 1;
    if (x >= this.width) expansion.right = 1;
    if (y < 0) expansion.top = 1;
    if (y >= this.height) expansion.bottom = 1;

    if (expansion.top || expansion.right || expansion.bottom || expansion.left) this.expand(expansion);
};

ProgramMap.prototype.set = function(x, y, char, dontExpand) {
    var realChar = cells.names[char] ? char : " ";

    var charClass = cells.classes[cells.names[realChar]];
    var instance = new charClass(this);
    instance.type = char;

    this.setCell(x, y, instance, dontExpand);
};

ProgramMap.prototype.setCell = function(x, y, cell, dontExpand) {
    if (cell._inWorld && cell._removed) cell._removed();

    var originalX = x;
    var originalY = y;

    x -= this.xOffset;
    y -= this.yOffset;

    if (!dontExpand) this.autoExpand(x, y, "set");

    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        var oldCell = this.cells[y][x];
        if (oldCell) {
            if (oldCell._removed) oldCell._removed();
            oldCell._inWorld = false;
        }
    }

    // add cell
    this.cells[y][x] = cell;
    cell._inWorld = true;
    if (cell._added) cell._added();

    cell.x = originalX;
    cell.y = originalY;

    this.emit('set', originalX, originalY, cell);
};

ProgramMap.prototype.expand = function(expand) {
    var leftX = expand.left;
    var rightX = expand.right;
    var topY = expand.top;
    var bottomY = expand.bottom;

    var currentWidth = this.width;

    // create new rows
    for (var xPos = 0; xPos < currentWidth; xPos++) {
        for (var topYPos = 0; topYPos < topY; topYPos++) {
            if (xPos === 0) this.cells.unshift([]);
            this.set(xPos - this.xOffset, -this.yOffset, " ", true);
        }
        for (var bottomYPos = 0; bottomYPos < bottomY; bottomYPos++) {
            if (xPos === 0) this.cells.push([]);
            this.set(xPos - this.xOffset, this.cells.length - 1 - this.yOffset, " ", true);
        }
    }

    var currentHeight = this.height;

    // create new columns
    for (var yPos = 0; yPos < currentHeight; yPos++) {
        for (var leftXPos = 0; leftXPos < leftX; leftXPos++) {
            this.cells[yPos].unshift(false);
            this.set(-this.xOffset, yPos - this.yOffset, " ", true);
        }

        for (var rightXPos = 0; rightXPos < rightX; rightXPos++) {
            this.set(this.cells[yPos].length - this.xOffset, yPos - this.yOffset, " ", true);
        }
    }

    // shift all operations
    this.xOffset += leftX;
    this.yOffset += topY;
};

ProgramMap.fromString = function(program) {
    var lines = program.replace(/\r/gm, "").split("\n");

    var columnDefs = lines[0].split();
    var arr = lines.slice(1);

    var width = 0;
    arr.forEach(function(line) {
        if (line.length > width) width = line.length;
    });

    var padString = (new Array(width + 1)).join(" ");
    var cells = arr.map(function(line) {
        return (line + padString).substr(0, width).split('');
    });

    cells.unshift(padString.split(''));

    return new ProgramMap(cells, columnDefs);
};

module.exports = ProgramMap;