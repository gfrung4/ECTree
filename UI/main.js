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
});

socket.on("addSuccess", function() {
    $("#ChooseScriptModal").modal('hide');
    $("#codeModal").modal('hide');
    $("#AudioModal").modal('hide');
    clickMainTab(0);
});

socket.on("updatePatterns", function(data) {
    featuredPatterns = data.featured;
    topPatterns = data.top;
    recentPatterns = data.recent;
    var tabNow = selectedTab;
    selectedTab = -1;
    clickTab(tabNow);
});
