var audioCurrent = "";
var audioQueue = [];
var audioTime = 0;
var audioLengths = [];
var audioCountdownInterval;

socket.on("getAudioQueue", function(res) {
    console.log("recieved audio queue");
    audioCurrent = res.current;
    audioQueue = res.queue;
    audioTime = res.time;
    audioLengths = res.timeBetweenPatterns;
    console.log(res);
    audioUpdateQueue();
});

function audioUpdateQueue() {
    audioSetCurrentName(audioCurrent);
    var i, l;
    if (audioQueue.length < audioNumRows()) {
        for (i = 0, l = audioNumRows() - audioQueue.length; i < l; i++) {
            audioRemoveRow();
        }
    } else if (audioQueue.length > audioNumRows()) {
        for (i = 0, l = audioQueue.length - audioNumRows(); i < l; i++) {
            audioAddRow();
        }
    }
    var thisTime = audioTime;
    for (i = 0, l = audioQueue.length; i < l; i++) {
        audioSetName(i, audioQueue[i]);
        audioSetTime(i, thisTime);
        thisTime += audioLengths[i];
    }
    clearInterval(audioCountdownInterval);
    audioCountdownInterval = setInterval(audioQueueCountdown, 1000);
}

function audioQueueCountdown() {
    audioTime--;
    if (audioTime <= 0) {
        if (audioQueue.length !== 0) {
            audioCurrent = audioQueue.shift();
            audioTime = audioLengths.shift();
        } else {
            audioCurrent = " ";
            audioTime = 0;
        }
        audioUpdateQueue();
    }
    var thisTime = audioTime;
    for (var i = 0, l = audioQueue.length; i < l; i++) {
        audioSetTime(i, thisTime);
        thisTime += audioLengths[i];
    }
}

function audioNumRows() {
    return $("#queueTableAudio").children().length;
}

function audioAddRow() {
    var numberRows = $("#queueTableAudio").children().length;
    var html = $("#audioQueueTableRow").html();
    html = html.replaceAll("[ID]", numberRows);
    $("#queueTableAudio").append(html);
}

function audioRemoveRow() {
    var numberRows = $("#queueTableAudio").children().length;
    $("#audioRow" + (numberRows - 1)).remove();
}

function audioSetName(row, name) {
    $("#audioRowName" + row).text(name);
}

function audioSetCurrentName(name) {
    $("#audioRowNameCurrent").text(name);
}

function audioSetTime(row, time) {
    $("#audioRowTime" + row).text(formatTime(time));
}
