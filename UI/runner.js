var frames = [];
var myPattern = {
    name: "My Program",
    data: []
};
var previewFrame = 0;

function preview() {
    var c = document.getElementById("lightPreview");
    var timeToNext;

    if (c !== null) {
        var ctx = c.getContext("2d");

        // Compute height and width
        var w = $("#lightPreview").width();
        w = Math.ceil(w / 320) * 320;
        var h = w / 20;
        ctx.canvas.width = w;
        ctx.canvas.height = h;

        // Draw the frame
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillRect(0, 0, w, h);

        if (frames.length !== 0) {
            if (previewFrame >= frames.length) {
                previewFrame = 0;
            }
            for (var j = 0; j < 320; j++) {
                var light = frames[previewFrame].strip[j];
                ctx.fillStyle = "rgb(" + light.red + "," + light.green + "," + light.blue + ")";
                ctx.fillRect(j * (w / 320), 0, w / 320, h);
            }
            timeToNext = frames[previewFrame].delay;
            previewFrame++;
        } else {
            timeToNext = 20;
        }
    }
    setTimeout(preview, timeToNext);
}

preview();

function clickCode() {
    $('#codeModalReplace').html($("#codeModal1").html());
    $('#codeModal').modal('show');
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setFontSize(18);
}

function clickBack() {
    $('#codeModalReplace').html($("#codeModal1").html());
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setFontSize(18);
}

function clickAdd() {
    myPattern.name = $("#programName").val();
    $('#codeModalReplace').html($("#codeModal3").html());

    console.log(JSON.stringify(myPattern));

    socket.emit('addNew', myPattern);
}

// The code runner
var codeFrame, generatedFrames;

function clickGenerate(hide) {
    codeFrame = [];
    generatedFrames = [];
    for (var i = 0, l = 320; i < l; i++) {
        newLight = {
            red: 0,
            green: 0,
            blue: 0
        };
        codeFrame.push(newLight);
    }

    var code = editor.getValue();
    eval(code);

    frames = generatedFrames;
    myPattern.data = simplify(generatedFrames);

    if (hide) {
        $('#codeModalReplace').html($("#codeModal2").html());
    }
}

function setPixel(index, red, green, blue) {
    if (index >= 0 && index < codeFrame.length) {
        codeFrame[index].red = Math.max(Math.min(red, 255), 0);
        codeFrame[index].green = Math.max(Math.min(green, 255), 0);
        codeFrame[index].blue = Math.max(Math.min(blue, 255), 0);
    }
}

function delay(time) {
    var newFrame = [];
    for (var i = 0, l = 320; i < l; i++) {
        newLight = {
            red: codeFrame[i].red,
            green: codeFrame[i].green,
            blue: codeFrame[i].blue
        };
        newFrame.push(newLight);
    }
    generatedFrames.push({
        strip: newFrame,
        delay: time
    });
}

function simplify(inFrames) {
    var simplified = [];

    var currentStrip = [];
    for (var i = 0; i < 320; i++) {
        currentStrip.push({
            r: 0,
            g: 0,
            b: 0
        });
    }

    for (i = 0, l = inFrames.length; i < l; i++) {
        var newFrame = {
            strip: [],
            delay: inFrames[i].delay
        };

        for (var j = 0; j < 320; j++) {
            newLight = inFrames[i].strip[j];
            oldLight = currentStrip[j];
            if (newLight.red === oldLight.r && newLight.green === oldLight.g && newLight.blue === oldLight.b) {
                // This light is the same
            } else {
                newFrame.strip.push({
                    l: j,
                    r: newLight.red,
                    g: newLight.green,
                    b: newLight.blue
                });
                currentStrip[j].r = newLight.red;
                currentStrip[j].g = newLight.green;
                currentStrip[j].b = newLight.blue;
            }
        }

        if (newFrame.strip.length === 0 && i !== 0) {
            lastFrame = simplified[simplified.length - 1];
            lastFrame.delay += inFrames[i].delay;
        } else {
            simplified.push(newFrame);
        }
    }

    return simplified;
}
