(function() {
    // Change this to change the number of LEDs you're controlling
    var NUMBER_OF_LEDS = 160;

    // For writing to SPI
    var fs = require('fs');
    var writeStream = fs.createWriteStream('/dev/spidev1.1');

    // The strip variable stores current LED status
    var strip = [];
    for (var i = 0; i < NUMBER_OF_LEDS; i++) {
        strip.push({
            r: 0,
            g: 0,
            b: 0
        });
    }

    // Function to set an LEDs color, specifying LED and RGB color
    module.exports.setLed = function(led, red, green, blue) {
        if (led < NUMBER_OF_LEDS) {
            strip[led] = {
                r: red,
                g: green,
                b: blue
            };
        }
    };

    // Function to update the LED string
    module.exports.show = function() {
        // Prepare array of bytes to send out SPI
        var toSend = [];

        // Include three bytes (GRB order) for each pixel
        for (var i = 0; i < NUMBER_OF_LEDS; i++) {
            toSend.push(0x80 | strip[i].g);
            toSend.push(0x80 | strip[i].r);
            toSend.push(0x80 | strip[i].b);
        }

        // Include (n+31)/32 "zero bytes" where n is number of LEDs
        var zeroByteAmount = Math.floor((NUMBER_OF_LEDS + 31) / 32);
        for (var j = 0; j < zeroByteAmount; j++) {
            toSend.push(0x00);
        }

        // Write the array to SPI
        writeStream.write(new Buffer(toSend));
    };
}());
