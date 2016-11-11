function clickChooseAdd() {
    socket.emit('addExisting', parseInt($('#programId').val()));
    $("#chooseScriptModalContent").html($("#codeModal3").html());
}

function clickChooseAudio() {
    socket.emit('addAudioQueue', {
        num: parseInt($('#audioSelectBtn input:radio:checked').val())
    });
    $("#chooseAudioModalContent").html($("#codeModal3").html());
}

function clickScript() {
    $('#codeModalReplace').html($("#codeModal1").html());
    $('#codeModal').modal('show');
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setFontSize(18);
    editor.setValue($("#defaultCode").html(), 1);
}

function clickChoose() {
    $('#chooseScriptModalContent').html($("#chooseScriptModalOriginal").html());
    $('#ChooseScriptModal').modal('show');
    selectedTab = -1;
    clickTab(0);
}
