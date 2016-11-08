#!/usr/bin/env node
// var sys = require('sys')
// var exec = require('child_process').exec;
// var socket = io();
var EOF = "End of file"
// function puts(error, stdout, stderr) { 
//     // sys.puts(stdout) 
//     console.log("audio is done this is stdout" + stdout);
// }

function play(name,io){
    // exec("mplayer ~/ECTree/xSongs/"+name+".mp3", puts);
    // console.log(name+" is done playing");
    const spawn = require('child_process').spawn;
    const ls = spawn('mplayer', ['xSongs/'+name+'.mp3']);
    
    ls.stdout.on('data', function(data) {
        if(data.indexOf(EOF) >= 0) {
             io.emit('audioDone');
             console.log("found end of file");
        }
       
        // console.log("stdout: " + data);
    });

    ls.stderr.on('data', function(data) {
      console.log("stderr: "+ data);
    });

    ls.on('close', function(code) {
        console.log("child process exited with code " + code);
    });
}

module.exports.play = play;






