#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var swordio = require('../');

var input = "";
var code = false;
var output = false;
var map = false;

var useStdin = false;

var isNextInput = false;
var isNextCode = false;
var isNextOutput = false;

var currentColor = 1;

for (var i = 2; i < process.argv.length; i++) {
    var arg = process.argv[i];
    var wasMatch = true;

    if (isNextInput) {
        input = arg;
        isNextInput = false;
    } else if (isNextCode) {
        code = arg;
        isNextCode = false;
    } else if (isNextOutput) {
        output = arg;
        isNextOutput = false;
    } else {
        switch (arg) {
            case '-i':
            case '--input':
                isNextInput = true;
                break;
            case '-s':
            case '--stdin':
                useStdin = true;
                break;
            case '-c':
            case '--code':
                isNextCode = true;
                break;
            case '-o':
            case '--output':
                isNextOutput = true;
                break;
            case '-m':
            case '--map':
                map = true;
                break;
            case '--help':
                showHelp();
                break;
            case '--version':
                showVersion();
                break;
            default:
                if (arg[0] === "-") {
                    console.error("Unknown command-line option: " + arg);
                    showHelp();
                } else wasMatch = false;
        }
    }

    if (wasMatch) {
        process.argv.splice(i, 1);
        i--;
    }
}

function showHelp() {
    console.error("\n  Usage: swordio [file] [-i <text>] [--input <text>] [-s] [--stdin] [-c <code>] [--code <code>]");
    console.error(  "                 [-o <file>] [--output <file>] [-m] [--map] [--help] [--version]");
    console.error("\nRuns Swordio code. Use [file] or --input to provide the map. Outputs any program result to");
    console.error(  "--output or stdout.");
    console.error("\n  Options:");
    console.error(  "      file");
    console.error(  "          An input Swordio file.");
    console.error("\n      -i <text>, --input <text>");
    console.error(  "          Uses the provided text as input to the Swordio program.");
    console.error("\n      -s, --stdin");
    console.error(  "          Use stdin as input to the Swordio program.");
    console.error("\n      -c <code>, --code <code>");
    console.error(  "          Uses the provided code instead of the file.");
    console.error("\n      -o <file>, --output <file>");
    console.error(  "          Writes the program output to a file instead of stdout.");
    console.error("\n      -m, --map");
    console.error(  "          Displays a live-updating version of the map.");
    console.error("\n      --help");
    console.error(  "          Shows this help message.");
    console.error("\n      --version");
    console.error(  "          Displays the version number of the Swordio interpreter.");
    process.exit(1);
}

function showVersion() {
    var pckg = require('../package.json');
    console.error(pckg.version);
    process.exit(1);
}

var mapText = "";

if (code) {
    mapText = code.replace(/,/g, "\n");
    readInput();
} else if (process.argv.length > 2) {
    try {
        mapText = fs.readFileSync(process.argv[2], 'utf8');
        readInput();
    } catch (ex) {
        console.error("Could not read Swordio file '" + process.argv[2] + "':");
        console.error(ex.stack);
        showHelp();
    }
} else {
    console.error("No input code provided.");
    showHelp();
}

function readInput() {
    if (input || !useStdin) ready();
    else {
        process.stdin.setEncoding('utf8');
        process.stdin.on('readable', function() {
            var chunk = process.stdin.read();
            if (chunk !== null) input += chunk;
        });
        process.stdin.on('error', function(ex) {
            console.error("Could not read input from stdin after " + input.length + " character(s):");
            console.error(ex.stack);
            showHelp();
        });
        process.stdin.on('end', ready);
    }
}

function pause(ms) {
    var curr = Date.now();
    ms += curr;
    while (curr < ms) {
        curr = Date.now();
    }
}

function updateMap(map, enemyMap) {
    term.saveCursor();

    var remainingEnemies = map.enemies.slice();

    // print out map tiles
    for (var y = 0; y < map.cells.length; y++) {
        var row = map.cells[y];
        for (var x = 0; x < row.length; x++) {
            var foundEnemy = false;
            var enemy;

            for (var i = 0; i < remainingEnemies.length; i++) {
                enemy = remainingEnemies[i];

                if (!enemy.isAlive) continue;
                if (enemy.x + map.xOffset === x && enemy.y + map.yOffset === y) {
                    foundEnemy = true;
                    remainingEnemies.splice(i, 1);
                    break;
                }
            }

            if (foundEnemy) {
                var enemyColor;
                if (enemyMap.has(enemy)) enemyColor = enemyMap.get(enemy);
                else {
                    enemyColor = currentColor++;
                    enemyMap.set(enemy, enemyColor);
                    if (currentColor > 7) currentColor = 1;
                }

                term.brightColor(enemyColor, enemy.type);
            } else term.white(row[x].type);
        }
        term.nextLine(1);
    }

    term.restoreCursor();
}

var term;

function ready() {
    try {
        var procedure = swordio.createProcedure(mapText);

        var enemyMap;
        if (map) {
            term = require('terminal-kit').terminal;
            enemyMap = new WeakMap();

            procedure.map.on('start tick', function () {
                updateMap(procedure.map, enemyMap);

                // pause for a while to allow the user to see the image
                pause(100);
            });
        }

        var outputPosition = 0;
        procedure.run(input, function (out) {
            if (map) {
                term.saveCursor();
                term.down(procedure.map.height + 3);
                if (outputPosition !== 0) term.right(outputPosition);
                term(out);
                outputPosition += out.length;
                term.restoreCursor();
            } else process.stdout.write(out);
        });

        if (map) {
            updateMap(procedure.map, enemyMap);
            term.down(procedure.map.height + 3);
        }

        // add trailing newline
        console.log("");
    } catch (ex) {
        if (map) term.down(procedure.map.height + 3);
        console.error("Could not run map:");
        console.error(ex.stack);
        process.exit(1);
    }
}