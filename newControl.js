#!/usr/bin/env node

var led = require("./led.js");
var fs = require('fs');
var timeoutVar;

function display(x, frame) {
    if (frame === 0) {
        for (var i = 0; i < 320; i++) {
            led.setLed(i, 0, 0, 0);
        }
    }

    var y = x.data[frame].strip;
    for (var i = 0; i < y.length; i++) {
        led.setLed(y[i].l, y[i].r, y[i].g, y[i].b);
    }
    led.show();
    timeoutVar = setTimeout(function() {
        if ((frame + 1) === x.data.length) {
            display(x, 0);
        } else {
            display(x, frame + 1);
        }
    }, x.data[frame].delay);
}

module.exports.setProgram = function(program) {
    clearTimeout(timeoutVar);

    for (var i = 0; i < 320; i++) {
        led.setLed(i, 0, 0, 0);
    }
    led.show();

    display(program, 0);
};
