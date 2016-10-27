(function() {
    // Start the C program that controls the LEDs
    var spawn = require('child_process').spawn;
    var ls = spawn('./led/led', []);

    // Function to set an LEDs color, specifying LED and RGB color
    module.exports.setLed = function(led, red, green, blue) {
        var data = [Math.floor(led / 128), led % 128, green, red, blue];
        ls.stdin.write(new Buffer(data));
    };

    // Show all LEDs
    module.exports.show = function() {
        ls.stdin.write(new Buffer([255]));
    };
}());
