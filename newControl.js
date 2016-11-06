#!/usr/bin/env node
// Load the led module to control the LED string
var led = require("./led.js");
var fs = require('fs');
var sleep = require('sleep');

var pattern = JSON.parse(fs.readFileSync('./pattern.json', 'utf8'));
var runnerPattern = [];

function display(x) {
    for(var i=0;i<20;i++){
        console.log(i);
        sleep.sleep(1)
        
    }
}

display(pattern);

function makeRunner(){
    
}