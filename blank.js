#!/usr/bin/env node
// Load the led module to control the LED string
var led = require("./led.js");

/*

Use these two function calls to control the LED string.

led.setLed(led, red, green, blue);

    Sets the given LED (starting at 0 for the first LED) to the given red, green,
    and blue color.  This does not cause the LED to change!  Call led.show()
    to make the LED actually change color.

led.show();

    Updates the LED string with all the set colors.

*/
