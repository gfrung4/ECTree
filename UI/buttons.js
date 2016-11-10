function clickChooseAdd() {
    socket.emit('addExisting', parseInt($('#programId').val()));
    $("#chooseScriptModalContent").html($("#codeModal3").html());
}

function clickChooseAudio() {
    socket.emit('addAudioQueue', {
        num: parseInt($('#audioSelectBtn input:radio:checked').val())
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
    editor.insert("// These are the two functions that you will need to use to write your code\n");
    editor.insert("// setPixel(led, red, green, blue); this is used to set an led to a certain color\n");
    editor.insert("// delay(t); this is a delay where t is in millaseconds\n")
}

function clickChoose() {
  $('#chooseScriptModalContent').html($("#chooseScriptModalOriginal").html());
  $('#ChooseScriptModal').modal('show');
}
