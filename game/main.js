// Created by Radek on 2016-05-20.
'use strict';

var gameSpeed = 400;
var dir = 2;
var $length;
var possibleStarts = [[4,4],[10,4],[15,7],[4,14],[6,11]];
var possibleEnds = [[16,44],[12,24],[15,27],[13,28]];
var $game = $('#game');
var metroOnMap = false;

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
    for (var i=1; i<6; i++) {
        for (var j=1; j<21; j++) {
            var $div = $('<div>');
            $('#controls').append($div);
            $div.addClass('cell').attr('id','controlcell-'+i+'-'+j);
        }
    }
    $('#controlcell-3-3').addClass('railroad');
    $('#controlcell-3-13').addClass('metro');
}

function createPlaces() {
    var startPoint = possibleStarts[Math.round(Math.random()*4)];
    var endPoint = possibleEnds[Math.round(Math.random()*3)];
    $('#cell-'+startPoint[0]+'-'+startPoint[1]).addClass('start-point');
    $('#cell-'+endPoint[0]+'-'+endPoint[1]).addClass('end-point');
}
function buildRoads() {
    $game.off();
    $game.on('click','.cell', function () {
        $(this).addClass('railroad');
    });
}
function buildMetro() {
    $game.off();
    if (metroOnMap === false) {
        $game.on('click', '.cell', function () {
            $(this).addClass('metro');
            metroOnMap = true;
        });
    }
}

// $('#controls').on('click','div#controlcell-3-3', buildRoads());
$('#controls').on('click','#controlcell-3-13', buildMetro());

/*function gameplay() {
    var newx = snake[0][0];
    var newy = snake[0][1];
    var $food = $('.food');
    switch (dir) {
        case 1:
            newx -= 1;
            break;
        case 2:
            newy += 1;
            break;
        case 3:
            newx += 1;
            break;
        case 4:
            newy -= 1;
            break;
    }
    if ((newx < 1) || (newy < 1) || (newx > 20) || (newy > 20) || ($('#cell-' + newx + '-' + newy).hasClass('snake'))) {
        $('.cell').addClass('black');
    } else if ($food.attr('id') === 'cell-' + newx + '-' + newy) {
        snake.unshift([newx, newy]);
        $('#cell-' + newx + '-' + newy).addClass('snake').removeClass('food');
        if ($length === 399) {
            setTimeout(function () {$('.cell').removeClass('snake');}, 1000);
        } else {
            createFood();
            gameSpeed -= 1;
            setTimeout(function () {gameplay();}, gameSpeed);}
    } else {
        var last = snake.pop();
        snake.unshift([newx,newy]);
        $('#cell-'+last[0]+'-'+last[1]).removeClass('snake');
        $('#cell-'+newx+'-'+newy).addClass('snake');
        setTimeout(function() {gameplay();}, gameSpeed);
    }
}

function game() {
    createBoard();
    createFood();
    setTimeout(function() {gameplay();}, gameSpeed);
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
    });
}*/

$(document).ready(function() {
    createBoard();
    createPlaces();
    createControls();
});