// Created by Radek on 2016-05-20.
'use strict';

var gameSpeed = 400;
var snake = [[3,3],[3,2],[3,1]];
var dir = 2;
var $length;

function createBoard() {
    for (var i=1; i<21; i++) {
        for (var j=1; j<21; j++) {
            var $div = $('<div>');
            $('#game').append($div);
            $div.addClass('cell').attr('id','cell-'+i+'-'+j);
        }
    }
    snake.map(function(a) {
        return $('#cell-'+a[0]+'-'+a[1]).addClass('snake');
    });
}

function createFood() {
    $length = $('.snake').length;
    $('.cell:not(.snake)').eq(Math.round(Math.random() * (399 - $length))).addClass('food');
}

function gameplay() {
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
}

$(document).ready(function() {
   game();
});