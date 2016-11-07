#!/usr/bin/env node

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var control = require("./newControl.js");
var fs = require('fs');
var queue = [];
var queueNames = [];
var currentName = 'Rainbow';

var audioQueue = [];
var audioQueueNames = [];
var audioNames = ['Christmas Tree', 'Away In A Manger', 'So this is Christmas', 'Jingle Bells', 'Silient Night', 'White Christmas', 'Santa Claus is Coming to Town'];

var timeBetweenPatterns = 240; // in seconds

var builtInNames = ['Rainbow', 'Runner', 'Red', 'Blue', 'Green', 'Ping Pong'];
var current = 0;
var time = timeBetweenPatterns;
var timeDelay = 50;

// parse the built in json files and then put them in the array

var rainbow = JSON.parse(fs.readFileSync('./patterns/rainbow.json', 'utf8'));
var runner = JSON.parse(fs.readFileSync('./patterns/runner.json', 'utf8'));
var red = JSON.parse(fs.readFileSync('./patterns/red.json', 'utf8'));
var blue = JSON.parse(fs.readFileSync('./patterns/blue.json', 'utf8'));
var green = JSON.parse(fs.readFileSync('./patterns/green.json', 'utf8'));
var pingpong = JSON.parse(fs.readFileSync('./patterns/pingpong.json', 'utf8'));

var builtInScripts = [rainbow, runner, red, blue, green, pingpong];

var firstRun = true;
function run() {
    // if(!firstRun){
        control.stop();
    // }
    control.display(builtInScripts[current],0)
}
// run();
setInterval(run, timeDelay);

app.use('/', express.static(__dirname + '/UI'));

io.on('connection', function(socket) {
    // Code here will be run when a user connects.
    console.log("[SOCKET] Connection started.");
    socket.on('getQueue', function() {
        console.log("client requested the queue");
        socket.emit('getQueue', {
            current: currentName,
            queue: queueNames,
            time: time,
            timeBetweenPatterns: timeBetweenPatterns
        });
    });

    socket.on('addBuiltInQueue', function(x) {
        console.log("adding " + builtInNames[x.num] + " to the queue");
        queueNames.push(builtInNames[x.num]);
        queue.push(x.num); //builtInScripts[x.num]);
        console.log("The new queue is " + queueNames);
        socket.emit('getQueue', {
            current: currentName,
            queue: queueNames,
            time: time,
            timeBetweenPatterns: timeBetweenPatterns
        });
    });

    socket.on('addAudioQueue', function(x) {
        console.log("adding" + audioNames[x.num] + "to the audio queue");
        audioQueue.push(x.num);
        audioQueueNames.push(audioNames[x.num]);
    });

    socket.on('disconnect', function() {
        // Code here will be run when a user disconnects.
        console.log("[SOCKET] Connection ended.");
    });
});

setInterval(timer, 1000);

function timer() {
    time -= 1;
    if (time <= 0) {
        if (queue.length > 0) {
            //change whats running
            
            current = queue.shift(); //require('./'+queue[0]);
            console.log("changed the queue and current = "+current);
            time = timeBetweenPatterns;
            currentName = queueNames.shift();
        }
        if (audioQueue.length > 0) {
            console.log("adding to the audio queue");
        }
    } else {
        time = 0;
    }
}

http.listen(887, function() {
    console.log('The server has started.');
});
