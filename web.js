#!/usr/bin/env node

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var control = require("./newControl.js");
var fs = require('fs');
// var music = require("./music.js");
// var playerSocket;

// Find all the program files in the "prgrams" folder
var programFiles = fs.readdirSync("programs");
for (var i = 0, l = programFiles.length; i < l; i++) {
    if (programFiles[i].length <= 5 || programFiles[i].substring(programFiles[i].length - 5) !== ".json") {
        programFiles.splice(i, 1);
        i--;
        l--;
    } else {
        programFiles[i] = parseInt(programFiles[i].substring(0, programFiles[i].length - 5));
    }
}

// Calculate the ID of the next program to be submitted
var nextId = Math.max.apply(null, programFiles) + 1;

// Store the memory usage before loading all the programs
var memBefore = process.memoryUsage().heapUsed;

// Load the programs
console.log("Loading " + programFiles.length + " programs...");
var programs = [];
var allPatterns = [];

for (var i = 0, l = programFiles.length; i < l; i++) {
    programs[programFiles[i].toString()] = JSON.parse(fs.readFileSync("programs/" + programFiles[i] + ".json", "utf8"));

    var simple = {
        id: programFiles[i],
        name: programs[programFiles[i].toString()].name
    };
    allPatterns.push(simple);
}

// Calculate the memory used by the programs
var memAfter = process.memoryUsage().heapUsed;
var memUsed = Math.floor((memAfter - memBefore) / 100000) / 10;
console.log("Done.  " + programFiles.length + " loaded programs use " + memUsed + " MB of RAM.");
console.log("The next program ID will be " + nextId + ".");




var queue = [];
var queueNames = [];
var currentProgram = 5;
var currentProgramName = programs[currentProgram].name;
var timeBetweenPatterns = 30;
var time = 0;
control.setProgram(programs[currentProgram]);

var audioQueue = [];
var audioQueueNames = [];
var audioQueueLengths = [];
var audioNames = ['Christmas Tree', 'Away In A Manger', 'So this is Christmas', 'Jingle Bells', 'Silent Night', 'White Christmas', 'Santa Claus is Coming to Town'];
var audio = ["Christmastree", "AwayinaManger", "CelineDion-SoThisIsChristmas", "JingleBells", "Silentnight", "BingCrosby-WhiteChristmas", "SantaClausIsComingtotown"];
var audioLength = [128, 68, 254, 133, 193, 180, 124];
var audioIsPlaying = false;
var currentAudioName = " ";
var audioTime = 0;
var currentAudioLength = 0;

app.use('/', express.static(__dirname + '/UI'));

function updateQueue() {
    io.sockets.emit('getQueue', {
        current: currentProgramName,
        queue: queueNames,
        time: time,
        timeBetweenPatterns: timeBetweenPatterns
    });
}

function updateAudioQueue() {
    io.sockets.emit('getAudioQueue', {
        current: currentAudioName,
        queue: audioQueueNames,
        time: currentAudioLength - audioTime,
        timeBetweenPatterns: audioQueueLengths
    });
}

function getPatternsPacket() {
    var sorted = allPatterns.sort(function(a, b) {
        return b.id - a.id;
    });

    var amount = 10;
    if (sorted.length > amount) {
        sorted = sorted.slice(0, amount);
    }

    var featured = [{
        id: 3,
        name: 'Runner'
    }];

    return {
        featured: featured,
        top: [],
        recent: sorted
    };
}

getPatternsPacket();

function updatePatterns() {
    io.sockets.emit('updatePatterns', getPatternsPacket());
}

io.on('connection', function(socket) {
    // Code here will be run when a user connects.
    playerSocket = socket;
    console.log("[SOCKET] Connection started.");
    socket.emit('getQueue', {
        current: currentProgramName,
        queue: queueNames,
        time: time,
        timeBetweenPatterns: timeBetweenPatterns
    });
    socket.emit('getAudioQueue', {
        current: currentAudioName,
        queue: audioQueueNames,
        time: currentAudioLength - audioTime,
        timeBetweenPatterns: audioQueueLengths
    });
    socket.emit('updatePatterns', getPatternsPacket());

    socket.on('addNew', function(data) {
        console.log("Got add new.");
        console.log(data);
        var thisId = nextId++;
        fs.writeFile("programs/" + thisId + ".json", JSON.stringify(data), function(err) {
            if (err) {
                throw err;
            }
            programs[thisId.toString()] = data;
            queue.push(thisId);
            allPatterns.push({
                id: thisId,
                name: data.name
            });
            updatePatterns();
            queueNames.push(data.name);
            socket.emit('addSuccess');
            updateQueue();
        });
    });

    socket.on('addExisting', function(number) {
        console.log("Got add existing (" + number + ").");
        if (programs[number] !== undefined) {
            queue.push(number);
            queueNames.push(programs[number].name);
            socket.emit('addSuccess');
            updateQueue();
        }
    });

    socket.on('addAudioQueue', function(x) {
        console.log("adding " + audio[x.num] + " to the audio queue");
        audioQueue.push(audio[x.num]);
        audioQueueNames.push(audioNames[x.num]);
        audioQueueLengths.push(audioLength[x.num]);
        socket.emit('addSuccess');
        updateAudioQueue();
    });

    socket.on('disconnect', function() {
        // Code here will be run when a user disconnects.
        console.log("[SOCKET] Connection ended.");
    });
});

function timer() {
    time--;
    if (time <= 0) {
        if (queue.length > 0) {
            currentProgram = queue.shift();
            currentProgramName = queueNames.shift();
            console.log("Time expired.  Next program: " + currentProgramName);

            control.setProgram(programs[currentProgram]);

            time = timeBetweenPatterns;
            updateQueue();
        } else {
            // console.log("Time expired, but no new pattern in queue!");
            time = 0;
        }
    }

    if (!audioIsPlaying) {
        if (audioQueue.length > 0) {
            currentAudioName = audioQueueNames.shift();
            currentAudioLength = audioQueueLengths.shift();
            audioTime = 0;
            audioIsPlaying = true;
            play(audioQueue.shift());
            updateAudioQueue();
        } else {
            var needUpdate = false;
            if (currentAudioName !== " ") {
                needUpdate = true;
            }
            currentAudioName = " ";
            currentAudioLength = 0;
            audioTime = 0;
            if (needUpdate) {
                updateAudioQueue();
            }
        }
    }

    //console.log("Audio status: ");
    //if(audioIsPlaying) {
    //    console.log("Playing: " + currentAudioName + " ( " + audioTime + " / " + currentAudioLength + " )");
    //    console.log("Queue: ");
    //    console.log(audioQueueNames);
    //    console.log(audioQueueLengths);
    //  } else {
    //    console.log("Queue empty.");
    //  }
}
setInterval(timer, 1000);

http.listen(80, function() {
    console.log('The server has started.');
});

// var EOF = "End of file"

function play(name) {
    const spawn = require('child_process').spawn;
    const player = spawn('mplayer', ['xSongs/' + name + '.mp3']);

    player.stdout.on('data', function(data) {
        // if(String(data).indexOf(EOF) >= 0) {
        //      audioIsPlaying = false;
        //      console.log("found end of file");
        // }
    });

    player.stderr.on('data', function(data) {
        data = data.toString('utf8');
        if (data.substring(0, 2) === "A:") {
            data = data.split(" ");
            for (var i = 0, l = data.length; i < l; i++) {
                if (data[i].length === 0) {
                    data.splice(i, 1);
                    i--;
                    l--;
                }
            }
            audioTime = parseInt(data[1]);
        }


    });

    player.on('close', function(code) {
        console.log("child process exited with code " + code);
        audioIsPlaying = false;
    });
}
