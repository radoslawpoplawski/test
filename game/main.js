// Created by Radek on 2016-05-20.
'use strict';

var $game = $('#app');
var cpuTurn;

function createBoard() {
    var $table = $('<table>');
    var index = 0;
    for (var i=0; i<3; i++) {
        var $tr = $('<tr>');
        $table.append($tr);
        for (var j=0; j<3; j++) {
            var $td = $('<td>');
            $td.addClass('cell').data('cellIndex', index + 1);
            $tr.append($td);
            index++;
        }
    }
    $game.empty().append($table);
}

function playGame() {
    $('#button').hide();
    createBoard();
    if (cpuTurn === true) { game(false); console.log('Player start a game !');}
    else if (cpuTurn === false) { game(true); console.log('First player: CPU');}
    else {game(false); console.log('Player start a game!');}

    $game.on('click', 'td:not(.green, .red)', function (event, lastCpu) {
        lastCpu = lastCpu || false;
        if ((lastCpu === true) && (cpuTurn === true)) {
            $(this).addClass('red');
            checkWin(lastCpu, 'CPU');
        } else if ((lastCpu === false) && (cpuTurn === false)) {
            $(this).addClass('green');
            checkWin(lastCpu, 'player');
        } else {
            console.log('Now is CPU turn !');
        }
    });
}

function game(firstCpu) {
    cpuTurn = firstCpu;
    if (firstCpu === true) {
        var $emptyFields = $('td:not(.green, .red)');
        setTimeout(function () {
            $emptyFields.eq(Math.round(Math.random() * ($emptyFields.length - 1))).trigger('click', firstCpu)
        }, 1000);
    }
}

function getIndexes(player) {
    (player === true) ? (player = '.red') : (player = '.green');
    return $(player, $game).map(function () {
        return $(this).data('cellIndex');}
            ).get();
}

function compareLines(indexes) {
    var win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
    win = win.map(function (a) {
        return a.map(function(b) {
            return indexes.some(function(c) {
                return c === b;})
            })
        });
    win = win.map(function(a) {
        if ((a[0] === true) && (a[1] === true) && (a[2] === true)) {
            return a = 1;
        } else {return a = 0;}
        });
    win = win.find(function(a) {
        return a === 1;
    });
    return win;
}

function checkWin(lastCpu,player) {
    var number = 9 - $('td:not(.green, .red)').length;
    if ((number > 4) && (compareLines(getIndexes(lastCpu)) === 1)) {
        console.log('win by ' + player + ' !');
        $game.off('click');
        $('#button').show();
    } else if (number === 9) {
        console.log('it\'s a draw');
        $game.off('click');
        $('#button').show();
    } else {game(!(lastCpu));
    }
}

$(document).ready(function() {
    $('#button').click(function() {playGame();});
});