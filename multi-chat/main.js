'use strict';
var conn;
var peer = new Peer({key: 'lwjd5qra8257b9'});
peer.on('open', function(id) {
    $('#myId').val(id);
});

$('#but1').click(function() {
    conn = peer.connect($('#rid').val());
    estabilishedConnection(conn);
});

function estabilishedConnection(connection){
    console.log('działa');
    connection.on('open', function() {
        connection.on('data', function(data) {console.log('Received', data);});
        $('#but2').click(function() {
            connection.send($('#myMessage').val());
        });
    });
}
peer.on('connection', function(conn) {
    estabilishedConnection(conn);
});