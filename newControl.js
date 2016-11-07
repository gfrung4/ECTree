#!/usr/bin/env node
// Load the led module to control the LED string
var led = require("./led.js");
var fs = require('fs');
var sleep = require('sleep');
var timeoutVar;

// var pattern = JSON.parse(fs.readFileSync('./pattern.json', 'utf8'));
// var runnerPattern = [];

function display(x,frame) {
        // console.log(frame);
        var y = x.data[frame].strip;
        for(var i =0;i<y.length;i++){
            led.setLed(y[i].l,y[i].r,y[i].g,y[i].b);
        }
        led.show();
        timeoutVar = setTimeout(function(){
            
            if((frame+1)===x.data.length){
               display(x,0);   
            } else {
                display(x,frame +1);
            };
        }, x.data[frame].delay);
}

module.exports.display = display;
 
function stop(){
    clearTimeout(timeoutVar);
}

module.exports.stop = stop;

// display(pattern,0);