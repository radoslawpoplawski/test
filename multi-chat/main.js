'use strict';
var conn;
var peer = new Peer({key: 'lwjd5qra8257b9'});
peer.on('open', function(id) {
    $('#myId').val(id);
});

function estabilishedConnection(connection){
    console.log('działa');
    connection.on('open', function() {

        // receive data
        connection.on('data', function(data) {
            if (data.type == 'message') {console.log('Received:', data.text);}
            if (data.type == 'hide') {$('#'+data.text).hide()}
        });

        // send data
        $('#but2').click(function() {
            connection.send({type: 'message',text: $('#myMessage').val()});
        });
        $('.gamecard').click(function() {
            connection.send({type: 'hide',text: $(this).attr('id')});
            $(this).hide();
        });
    });
}

$('#but1').click(function() {
    conn = peer.connect($('#rid').val());
    estabilishedConnection(conn);
});

peer.on('connection', function(conn) {
    estabilishedConnection(conn);
});