#!/usr/bin/env node
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var queue = [];
var queueNames = [];//'hello','world','i','hope','this','works'];
var currentName = 'Rainbow';

var audioQueue =[];
var audioQueueNames = [];
var audioNames = ['Christmas Tree','Away In A Manger','So this is Christmas','Jingle Bells','Silient Night', 'White Christmas','Santa Claus is Coming to Town'];

var timeBetweenPatterns = 10; // in seconds
var builtInScripts = ['rainbow.js','runner.js','red.js','blue.js','green.js'];
var builtInNames = ['Rainbow','Runner','Red','Blue','Green'];
var builtInRequire = [];
var current = 0;//require('./'+builtInScripts[0]);
var time = 0;
var timeDelay = 50;

var rainbow  = require('./'+builtInScripts[0]);
var runner = require('./'+builtInScripts[1]);
var red = require('./'+builtInScripts[2]);
var blue =  require('./'+builtInScripts[3]);
var green = require('./'+builtInScripts[4]);

// for(var i=0;i<builtInNames;i++){
//     var temp = require('./'+builtInScripts[i]);
//     builtInRequire.add(temp);
//     console.log(i);
// }

function run(){
    // console.log("the time is "+time);
    switch(current){
        case 0:
            rainbow.run();
            break;
        case 1:
            runner.run();
            break;
        case 2:
            red.run();
            break;
        case 3:
            blue.run();
            break;
        case 4:
            green.run();
            break;
        default:
            console.log("bad current script");
    }
    // builtInRequire[0].run();
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
      queue.push(x.num);//builtInScripts[x.num]);
      console.log("The new queue is "+queueNames);
      socket.emit('getQueue',{
            current: currentName,
            queue: queueNames,
            time: time,
            timeBetweenPatterns: timeBetweenPatterns
        });
    });
    
    socket.on('addAudioQueue', function(x){
        console.log("adding" + audioNames[x.num]+"to the audio queue");
        audioQueue.push(x.num);
        audioQueueNames.push(audioNames[x.num]);
    })




    socket.on('disconnect', function() {
        // Code here will be run when a user disconnects.
        console.log("[SOCKET] Connection ended.");


    });
});



setInterval(timer,1000);

function timer(){
    time -= 1;
    if (time<=0){
        if(queue.length > 0){
            //change whats running
            console.log("changing the queue");
            current = queue.shift();//require('./'+queue[0]);
            time = timeBetweenPatterns;
            currentName = queueNames.shift();
            
        }
        if(audioQueue.length > 0){
            console.log("adding to the audio queue");
        }
    }
}

http.listen(887, function() {
    console.log('The server has started.');
});

