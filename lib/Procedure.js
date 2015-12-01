function Procedure(map) {
    this.map = map;
}

Procedure.prototype.run = function(input, onOutput) {
    var output = "";

    var oldInput = this.map._input;
    var oldOutput = this.map._output;

    this.map._input = function() {
        return input;
    };

    this.map._output = function(text) {
        output += text;
        if (onOutput) onOutput(text);
    };

    while (this.map.running) {
        this.map.tick();
    }

    this.map._input = oldInput;
    this.map._output = oldOutput;

    return output;
};

module.exports = Procedure;