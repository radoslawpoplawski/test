// Created by Radek on 2016-05-20.
'use strict';

var gameSpeed = 400;
var dir = 0;
var $length;
var route = [];
var possibleStarts = [[4,4],[10,4],[15,7],[4,14],[6,11]];
var possibleEnds = [[16,44],[12,24],[15,27],[13,28]];
var $game = $('#game');
var $controls = $('#controls');
var remainTracks = 30;
var startPoint, endPoint, metroDir, newMetrox, newMetroy;

function createBoard() {
    for (var i=1; i<26; i++) {
        for (var j=1; j<46; j++) {
            var $div = $('<div>');
            $game.append($div);
            $div.addClass('cell').attr('id','cell-'+i+'-'+j);
        }
    }
}
function createControls() {
    for (var i=1; i<5; i++) {
        for (var j=1; j<21; j++) {
            var $div = $('<div>');
            $controls.append($div);
            $div.addClass('cell').attr('id','controlcell-'+i+'-'+j);
        }
    }
    $('#controlcell-1-4').addClass('railroad');
    $('#controlcell-1-10').addClass('bulldozer');
    $('#controlcell-3-4').text('Buduj szlak');
    $('#controlcell-3-10').text('Kasuj');
    $('#controlcell-2-16').append('<button>Start!</button>');
    $('button').attr('id','startButton')
    $('#counter').text(remainTracks);
}

function createPlaces() {
    startPoint = possibleStarts[Math.round(Math.random()*4)];
    endPoint = possibleEnds[Math.round(Math.random()*3)];
    $('#cell-'+startPoint[0]+'-'+startPoint[1]).addClass('start-point');
    $('#cell-'+endPoint[0]+'-'+endPoint[1]).addClass('end-point');
}
function buildRoads() {
    $game.off();
    $game.on('click','.cell:not(.railroad)', function () {
        if ($('.railroad').length < 31) {
            $(this).addClass('railroad');
            route.push($(this).attr('id'));
            remainTracks -=1;
            $('#counter').text(remainTracks);
        }
    });
}
function buildMetro() {
    $('#cell-'+startPoint[0]+'-'+startPoint[1]).addClass('metro');
    return metroDir = startPoint;
}
function bulldoze() {
    $game.off();
    $game.on('click','.railroad', function () {
            $(this).removeClass('railroad');
    });
}

function checkRoute(position) {
    return route.some(function(a) {
        return 'cell-'+position[0]+'-'+position[1] === a;
    })
}

function startButton() {
    $controls.on('click','#startButton', function() {
        $('#controlcell-1-4').removeClass('railroad');
        $('#controlcell-1-10').removeClass('bulldozer');
        $('#controls').off();
        $('#controlcell-2-16').empty();
        buildMetro();
        $(document).keydown(function(e){
            if (e.keyCode == 37) {
                dir=4;
            }else if (e.keyCode == 38) {
                dir=1;
            }else if (e.keyCode == 39) {
                dir=2;
            }else if (e.keyCode == 40) {
                dir=3;
            }
            moveMetro();
        });
    });
}
function moveMetro() {
    $game.off();
    newMetrox = metroDir[0];
    newMetroy = metroDir[1];

    switch (dir) {
        case 1:
            newMetrox -= 1;
            break;
        case 2:
            newMetroy += 1;
            break;
        case 3:
            newMetrox += 1;
            break;
        case 4:
            newMetroy -= 1;
            break;
    }

    $('#cell-'+newMetrox+'-'+newMetroy).addClass('metro');
    $('#cell-'+metroDir[0]+'-'+metroDir[1]).removeClass('metro');
    metroDir = [newMetrox,newMetroy];
    if ((metroDir[0] === endPoint[0]) && (metroDir[1] === endPoint[1])) {
        console.log('WIN');
        $(document).off('keydown');
        $game.empty();
        $controls.empty();
        createBoard();
        createPlaces();
        createControls();
        startButton();
    } else if (checkRoute(metroDir) === true) {
        var index = route.indexOf('cell-'+metroDir[0]+'-'+metroDir[1]);
        delete route[index];
    } else {
        console.log('LOOSER');
        $(document).off('keydown');
        $game.empty();
        $controls.empty();
        createBoard();
        createPlaces();
        createControls();
        startButton();
    }

}
createBoard();
createPlaces();
createControls();

$controls.on('click','#controlcell-1-4', function() {
    buildRoads();
});
$controls.on('click','#controlcell-1-10', function() {
    bulldoze();
});
startButton();