function clickChooseAdd() {
    socket.emit('addBuiltInQueue', {
        num: $('#scriptSelectBtn input:radio:checked').val()
    });
}

function clickChooseAudio() {
    socket.emit('addAudioQueue', {
        num: $('#audioSelectBtn input:radio:checked').val()
    });
}

function clickScript() {
    $('#codeModalReplace').html($("#codeModal1").html());
    $('#codeModal').modal('show');
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setShowPrintMargin(false);
    editor.setFontSize(18);
}
