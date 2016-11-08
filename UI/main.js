String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var editor;
var current = "";
var queue = [];
var countdown = 0;
var timePerPattern = 0;
var countdownInterval;
var socket = io();

socket.on("connect", function() {
    // Code here will be run when the user is connected.
    socket.emit("getQueue");
});

socket.on("addSuccess", function() {
    $("#ChooseScriptModal").modal('hide');
    $("#codeModal").modal('hide');
});
