#!/usr/bin/env node
// Load the led module to control the LED string
var led = require("./led.js");
var fs = require('fs');
var sleep = require('sleep');

var pattern = JSON.parse(fs.readFileSync('./pattern.json', 'utf8'));
var runnerPattern = [];

function display(x,frame) {
    // for(var i=0;i<20;i++){
        console.log(frame);
        var y = x.data[frame].strip;
        for(var i =0;i<y.length;i++){
            led.setLed(y[i].l,y[i].r,y[i].g,y[i].b);
        }
        led.show();
        setTimeout(function(){
            
            if((frame+1)===x.data.length){
               display(x,0);   
            } else {
                display(x,frame +1);
            };
        }, x.data[frame].delay);
        // sleep.sleep(1)
        
    // }
}

display(pattern,0);

function makeRunner(){
}

// JSON file must have the following format     