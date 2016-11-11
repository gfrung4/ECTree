var tutorialStage = 0;

function clickTutorialNext() {
    tutorialStage++;
    tutorialLoadStage();
}

function clickTutorialBack() {
    tutorialStage--;
    tutorialLoadStage();
}

function tutorialLoadStage() {
    $("#tutorialContent").html($("#tutorialCard" + tutorialStage).html());

    switch (tutorialStage) {
        case 9:
            $("#tutorialPreviewArea").html('<canvas id="lightPreview" width="100" height="1" style="width:100%"></canvas>');
            clickGenerate(0);
            break;
        case 13:
            clickGenerate(0);
            break;
        case 14:
            clickGenerate(0);
            break;
        case 15:
            $("#tutorialPreviewButtonArea").html($("#tutorialPreviewButton").html());
            break;
        case 16:
            $("#tutorialAddButtonArea").html($("#tutorialAddButton").html());
            break;
    }
}

var tutorialTime = 0;
var lastTutorialStage = 0;

function tutorialRunner() {
    if (lastTutorialStage !== tutorialStage) {
        lastTutorialStage = tutorialStage;
        tutorialTime = 0;
    }
    tutorialTime++;

    switch (tutorialStage) {
        case 3:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "setLight(160,64,0,0);") {
                tutorialStage = 4;
                tutorialLoadStage();
            }
            break;
        case 4:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "setLight(160,64,0,0);delay(500);") {
                tutorialStage = 5;
                tutorialLoadStage();
            }
            break;
        case 5:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "setLight(160,64,0,0);delay(500);setLight(159,64,0,0);setLight(161,64,0,0);" || editorValue === "setLight(160,64,0,0);delay(500);setLight(161,64,0,0);setLight(159,64,0,0);") {
                tutorialStage = 6;
                tutorialLoadStage();
            }
            break;
        case 6:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "setLight(160,64,0,0);delay(500);setLight(159,64,0,0);setLight(161,64,0,0);delay(500);" || editorValue === "setLight(160,64,0,0);delay(500);setLight(161,64,0,0);setLight(159,64,0,0);delay(500);") {
                tutorialStage = 7;
                tutorialLoadStage();
            }
            break;
        case 7:
            console.log("Is 7");
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "setLight(160,64,0,0);delay(500);setLight(159,64,0,0);setLight(161,64,0,0);delay(500);setLight(158,64,0,0);setLight(162,64,0,0);" ||
                editorValue === "setLight(160,64,0,0);delay(500);setLight(161,64,0,0);setLight(159,64,0,0);delay(500);setLight(158,64,0,0);setLight(162,64,0,0);" ||
                editorValue === "setLight(160,64,0,0);delay(500);setLight(159,64,0,0);setLight(161,64,0,0);delay(500);setLight(162,64,0,0);setLight(158,64,0,0);" ||
                editorValue === "setLight(160,64,0,0);delay(500);setLight(161,64,0,0);setLight(159,64,0,0);delay(500);setLight(162,64,0,0);setLight(158,64,0,0);") {
                tutorialStage = 8;
                tutorialLoadStage();
            } else {
                console.log("Is false");
                console.log(editorValue);
            }
            break;
        case 8:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "setLight(160,64,0,0);delay(500);setLight(159,64,0,0);setLight(161,64,0,0);delay(500);setLight(158,64,0,0);setLight(162,64,0,0);delay(500);" ||
                editorValue === "setLight(160,64,0,0);delay(500);setLight(161,64,0,0);setLight(159,64,0,0);delay(500);setLight(158,64,0,0);setLight(162,64,0,0);delay(500);" ||
                editorValue === "setLight(160,64,0,0);delay(500);setLight(159,64,0,0);setLight(161,64,0,0);delay(500);setLight(162,64,0,0);setLight(158,64,0,0);delay(500);" ||
                editorValue === "setLight(160,64,0,0);delay(500);setLight(161,64,0,0);setLight(159,64,0,0);delay(500);setLight(162,64,0,0);setLight(158,64,0,0);delay(500);") {
                tutorialStage = 9;
                tutorialLoadStage();
            }
            break;
        case 11:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "for(vari=0;i<=2;i++){setLight(160-i,64,0,0);setLight(160+i,64,0,0);delay(500);}") {
                tutorialStage = 12;
                tutorialLoadStage();
            }
            break;
        case 12:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "for(vari=0;i<=160;i++){setLight(160-i,64,0,0);setLight(160+i,64,0,0);delay(500);}") {
                tutorialStage = 13;
                tutorialLoadStage();
            }
            break;
        case 13:
            // Progress automatically on code change
            var editorValue = editor.getValue().replace(/ /g, '').replace(/[\r\n]/g, '');
            if (editorValue === "for(vari=0;i<=160;i++){setLight(160-i,64,0,0);setLight(160+i,64,0,0);delay(100);}") {
                tutorialStage = 14;
                tutorialLoadStage();
            }
            break;

    }
}

setInterval(tutorialRunner, 250);

function clickTutorialAdd() {
    $('#codeModal').modal('show');
    clickAdd();
}
