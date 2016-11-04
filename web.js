var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var queue = [];
var queueNames = ['hello','world','i','hope','this','works'];
var currentName = 'none';
var currentlyRunning;
var timeBetweenPatterns = 240; // in seconds


app.use('/', express.static(__dirname + '/UI'));

io.on('connection', function(socket) {
    // Code here will be run when a user connects.
    console.log("[SOCKET] Connection started.");
    socket.on('getQueue', function(){
        console.log("client requested the queue");
        socket.emit('getQueue',function(){
             current = currentName;
        queue = queueNames;
        time = 53;
        timeBetweenPatterns = timeBetweenPatterns;
        });
       
        
    });
    
    socket.on('addQueue', function(x){
       console.log("add to the queue"+x);
       queueNames.push(x.name);
       queue.push(x.data);
    });




    socket.on('disconnect', function() {
        // Code here will be run when a user disconnects.
        console.log("[SOCKET] Connection ended.");


    });
});

http.listen(887, function() {
    console.log('The server has started.');
});
