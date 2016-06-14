'use strict';
var conn;
var peer = new Peer({key: 'lwjd5qra8257b9'});
peer.on('open', function(id) {
    $('#myId').val(id);
});

function estabilishedConnection(connection){
    console.log('działa');
    connection.on('open', function() {

        // close conenction
        $('#but2').click(function() {
            connection.close();
        });

        // receive data
        connection.on('data', function(data) {
            if (data.type == 'message') {console.log('Received:', data.text);}
            else {eval("$('#'+data.text).addClass(data.type)");}
        });

        // send data
        $('#but3').click(function() {
            var msg = {type: 'message',text: $('#myMessage').val()};
            connection.send(msg);
            console.log('Send:', msg.text);
        });
        $('.gamecard').click(function() {
            connection.send({type: 'hide',text: $(this).attr('id')});
            $(this).addClass('hide');
        });

        // on disconnect
        connection.on('close', function() {
            console.log('disconnect');
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
