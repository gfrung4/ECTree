#!/usr/bin/env node
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

function play(name){
    exec("mplayer ~/ECTree/xSongs/"+name+".mp3", puts);
    console.log(name+" is done playing");

module.exports.play = play;

