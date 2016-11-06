#!/usr/bin/env node
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var queue = [];
var queueNames = [];//'hello','world','i','hope','this','works'];
var currentName = 'none';

var timeBetweenPatterns = 40; // in seconds
var builtInScripts = ['rainbow.js','runner.js','red.js','blue.js','green.js'];
var builtInNames = ['Rainbow','Runner','Red','Blue','Green'];
var current = require('./'+builtInScripts[0]);
var time = 0;
var timeDelay = 50;


function run(){
    current.run();
}

time = timeBetweenPatterns;
setInterval(run,timeDelay);


app.use('/', express.static(__dirname + '/UI'));

io.on('connection', function(socket) {
    // Code here will be run when a user connects.
    console.log("[SOCKET] Connection started.");
    socket.on('getQueue', function(){
        console.log("client requested the queue");
        socket.emit('getQueue',{
            current: currentName,
            queue: queueNames,
            time: time,
            timeBetweenPatterns: timeBetweenPatterns
        });
       
        
    });
    
    socket.on('addBuiltInQueue', function(x){
      console.log("adding "+builtInNames[x.num]+" to the queue");
      queueNames.push(builtInNames[x.num]);
      queue.push(builtInScripts[x.num]);
      console.log("The new queue is "+queueNames);
      socket.emit('getQueue',{
            current: currentName,
            queue: queueNames,
            time: 53,
            timeBetweenPatterns: timeBetweenPatterns
        });
    });




    socket.on('disconnect', function() {
        // Code here will be run when a user disconnects.
        console.log("[SOCKET] Connection ended.");


    });
});



setInterval(timer,1000);

function timer(){
    time -= 1;
    if (time===0){
        if(queue.length > 0){
            //change whats running
            console.log("changing the queue");
            current = require('./'+queue[0]);
            time = timeBetweenPatterns;
        }
    }
}

http.listen(887, function() {
    console.log('The server has started.');
});