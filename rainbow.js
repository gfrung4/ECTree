#!/usr/bin/env node
// Load the led module to control the LED string
var led = require("./led.js");

// Frequency, starting offset, speed, and color
var frq = (2 * Math.PI) / 80;
var off = 0;
var speed = 0.1;
var color = [1, 0.05, 0.05];

// Show a sine rainbow
function showRainbow(f, o) {
    for (var i = 0; i < 160; i++) {
        var amt1 = Math.max(0, Math.min(127, 64 + Math.floor(64 * Math.sin(f * i + o))));
        var amt2 = Math.max(0, Math.min(127, 64 + Math.floor(64 * Math.sin(f * i + o + (2 * Math.PI / 3)))));
        var amt3 = Math.max(0, Math.min(127, 64 + Math.floor(64 * Math.sin(f * i + o + (4 * Math.PI / 3)))));
        led.setLed(i, amt1, amt2, amt3);
    }
    led.show();
}

// Repeatedly show rainbow at changing offset
function run() {
    showRainbow(frq, off += speed);
}
setInterval(run, 0);
