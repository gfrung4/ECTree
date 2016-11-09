socket.on("getAudioQueue", function(res) {   
    console.log("recieved audio queue");
    current = res.current;
    queue = res.queue;
    countdown = res.time;
    timePerPattern = res.timeBetweenPatterns;
    updateQueue();
});

function updateQueue() {
    setCurrentName(current);
    var i, l;
    if (queue.length < numRows()) {
        for (i = 0, l = numRows() - queue.length; i < l; i++) {
            removeRow();
        }
    } else if (queue.length > numRows()) {
        for (i = 0, l = queue.length - numRows(); i < l; i++) {
            addRow();
        }
    }
    var thisTime = countdown;
    for (i = 0, l = queue.length; i < l; i++) {
        setName(i, queue[i]);
        setTime(i, thisTime);
        thisTime += timePerPattern;
    }
    clearInterval(countdownInterval);
    countdownInterval = setInterval(queueCountdown, 1000);
}

function queueCountdown() {
    countdown--;
    if (countdown <= 0) {
        current = queue.shift();
        countdown = timePerPattern;
        updateQueue();
    }
    var thisTime = countdown;
    for (var i = 0, l = queue.length; i < l; i++) {
        setTime(i, thisTime);
        thisTime += timePerPattern;
    }
}

function numRows() {
    return $("#queueTableAudio").children().length;
}

function addRow() {
    var numberRows = $("#queueTableAudio").children().length;
    var html = $("#queueTableRow").html();
    html = html.replaceAll("[ID]", numberRows);
    $("#queueTableAudio").append(html);
}

function removeRow() {
    var numberRows = $("#queueTableAudio").children().length;
    $("#row" + (numberRows - 1)).remove();
}

function setName(row, name) {
    $("#rowName" + row).text(name);
}

function setCurrentName(name) {
    $("#rowNameCurrent").text(name);
}

function setTime(row, time) {
    $("#rowTime" + row).text(formatTime(time));
}

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
}
