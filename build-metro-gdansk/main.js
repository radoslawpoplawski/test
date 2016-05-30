/**
 * Created by Radek on 2016-05-27.
 */
'use strict';
var $game = $('#game');
var $menu = $('#menu');
var positionStart = 0;
var positionEnd, wayPoints, lastPosition, newPosition;
var route = [];
var routeFixed = [];

function createBoard() {
    var $table = $('<table>');
    var k = 0;
    for (var i=1; i<29; i++) {
        var $tr = $('<tr>');
        $table.append($tr);
        for (var j=1; j<41; j++) {
            var $td = $('<td>');
            $td.addClass('cell').data('cellindex',k);
            $tr.append($td);
            k++;
        }
    }
    $game.empty().append($table);
    for (var l=0; l<2; l++) {
        $game.append($('<div>'));
    }
    $('div', $game).eq(0).addClass('playButton').append($('<button>'));
    $('div', $game).eq(1).addClass('info');
    if (positionStart === 0) {
        $('button', 'div.playButton').text('Rozpocznij grę!');
    } else {$('button','div.playButton').text('Rozpocznij przejazd !');}
}

function createPlaces() {
    var possibleStarts = [243,443,564];
    wayPoints = [330,373,452,572,689,616];
    var possibleEnds = [541,623];
    positionStart = possibleStarts[Math.round(Math.random() * 2)];
    positionEnd = possibleEnds[Math.round(Math.random())];
    delete wayPoints[Math.round(Math.random() * 4)];
    $('td', $game).eq(positionStart).addClass('start');
    $('td', $game).eq(positionEnd).addClass('end');
    wayPoints.forEach(function(a) {$('td', $game).eq(a).addClass('waypoint');});
}

function createMenu() {
    var $table = $('<table>');
    var k = 0;
    for (var i=1; i<11; i++) {
        var $tr = $('<tr>');
        $table.append($tr);
        for (var j=1; j<41; j++) {
            var $td = $('<td>');
            $td.addClass('cell').data('menuCellindex',k);
            $tr.append($td);
            k++;
        }
    }
    $menu.empty().append($table);
    $('td', $menu).eq(84).addClass('rail_v');
    $('td', $menu).eq(89).addClass('rail_h');
    $('td', $menu).eq(94).addClass('rail_t1');
    $('td', $menu).eq(99).addClass('rail_t2');
    $('td', $menu).eq(104).addClass('rail_t3');
    $('td', $menu).eq(109).addClass('rail_t4');
    $('td', $menu).eq(114).addClass('buldoze');
}
function onEscKey() {
    $(document).keydown(function(e) {
        if (e.keyCode == 27) {
            $('.build').css({
                'display': 'none'}
            );
            $(document).off('mousemove');
            $game.off();
        }
    });
}

function createInfo() {
    var $info = $('div.info');
    for (var i=0; i<2; i++) {
        $info.append($('<div>'));
    }
    $('div', $info).eq(0).addClass('info-box1').text('Sprawdzanie trasy... ');
    $('div', $info).eq(1).addClass('info-box2').text('Przejazd metra...').css({
        'display': 'none'
    });
}

function buildRail(railPosition) {
    $game.off();
    $(document).mousemove(function() {
        var x=event.x;
        var y=event.y;
        $('.build').css({
            'display': 'block',
            'backgroundImage': 'url(images/rail_'+railPosition+'.png',
            'top': y-15+window.pageYOffset+'px',
            'left': x-15+'px'}
        );
    });
    if (railPosition !== 'bz') {
        $game.on('click', 'td:not(.start,.end,.waypoint,.rail_h, .rail_v, .rail_t1, .rail_t2, .rail_t3, .rail_t4)', function () {
            $(this).addClass('rail_' + railPosition);
            route.push($(this).data('cellindex'));
        });
    } else {
        $game.on('click', 'td:not(.start,.waypoint,.end)', function () {
            $(this).removeClass().addClass('cell');
            var indexRemovedCell = route.indexOf($(this).data('cellindex'));
            delete route[indexRemovedCell];
        });
    }

}
function onClicks() {
    $menu.on('click','td.rail_v', function() {
        buildRail('v');
    });
    $menu.on('click','td.rail_h', function() {
        buildRail('h');
    });
    $menu.on('click','td.rail_t1', function() {
        buildRail('t1');
    });
    $menu.on('click','td.rail_t2', function() {
        buildRail('t2');
    });
    $menu.on('click','td.rail_t3', function() {
        buildRail('t3');
    });
    $menu.on('click','td.rail_t4', function() {
        buildRail('t4');
    });
    $menu.on('click','td.buldoze', function() {
        buildRail('bz');
    });
    $('div.playButton').off();
    $('div.playButton').on('click','button', function() {
        $(document).off('mousemove');
        $game.off();
        $menu.off();
        $('.build').css({'display': 'none'});
        $(this).css({'display': 'none'});
        $('div.info').css({'display': 'block'});
        $('div.info-box1').css({'backgroundImage': 'url(images/loading.gif)'});
        createInfo();
        wayPoints.forEach(function(a) {route.push(a);});
        route.push(positionEnd);
        fixRoute();
    })
}
function findNextVerticaly(lastPlace) {
    if (route.some(function(a) {return (lastPlace-40 === a);})) {  // find new track on top side
        if ($('td', $game).eq(lastPlace-40).hasClass('rail_v')) {
            newPosition = lastPlace-40;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace-40).hasClass('rail_t1')) || ($('td', $game).eq(lastPlace-40).hasClass('rail_t2'))) {
            newPosition = lastPlace-40;
            $game.data('newDirection','h');
            return true;
        } else if (($('td', $game).eq(lastPlace-40).hasClass('waypoint')) || ($('td', $game).eq(lastPlace-40).hasClass('end'))) {
            newPosition = lastPlace-40;
            $game.data('newDirection','');
            return true;
        }
    }
    if (route.some(function(a) {return (lastPlace+40 === a);})) {  // find new track on bottom side
        if ($('td', $game).eq(lastPlace+40).hasClass('rail_v')) {
            newPosition = lastPlace+40;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace+40).hasClass('rail_t3')) || ($('td', $game).eq(lastPlace+40).hasClass('rail_t4'))) {
            newPosition = lastPlace+40;
            $game.data('newDirection','h');
            return true;
        } else if (($('td', $game).eq(lastPlace+40).hasClass('waypoint')) || ($('td', $game).eq(lastPlace+40).hasClass('end'))) {
            newPosition = lastPlace+40;
            $game.data('newDirection','');
            return true;
        }
    }
    return false;
}

function findNextHorizontaly(lastPlace) {
    if (route.some(function(a) {return (lastPlace+1 === a);})) {  // find new track on right side
        if ($('td', $game).eq(lastPlace+1).hasClass('rail_h')) {
            newPosition = lastPlace+1;
            $game.data('newDirection','h');
            return true;
        } else if (($('td', $game).eq(lastPlace+1).hasClass('rail_t1')) || ($('td', $game).eq(lastPlace+1).hasClass('rail_t3'))) {
            newPosition = lastPlace+1;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace+1).hasClass('waypoint')) || ($('td', $game).eq(lastPlace+1).hasClass('end'))) {
            newPosition = lastPlace+1;
            $game.data('newDirection','');
            return true;
        }
    }
    if (route.some(function(a) {return (lastPlace-1 === a);})) {  // find new track on left side
        if ($('td', $game).eq(lastPlace-1).hasClass('rail_h')) {
            newPosition = lastPlace-1;
            $game.data('newDirection','h');
            return true;
        } else if (($('td', $game).eq(lastPlace-1).hasClass('rail_t2')) || ($('td', $game).eq(lastPlace-1).hasClass('rail_t4'))) {
            newPosition = lastPlace-1;
            $game.data('newDirection','v');
            return true;
        } else if (($('td', $game).eq(lastPlace-1).hasClass('waypoint')) || ($('td', $game).eq(lastPlace-1).hasClass('end'))) {
            newPosition = lastPlace-1;
            $game.data('newDirection','');
            return true;
        }
    }
    return false;
}

function findNextTrack(lastPlace) {
    if ($('td', $game).eq(lastPlace).hasClass('end')) {
        routeFixed.push(lastPlace);
        return false;
    } else if ($game.data('newDirection') === 'v') {
        return findNextVerticaly(lastPlace);
    } else if ($game.data('newDirection') === 'h') {
        return findNextHorizontaly(lastPlace);
    } else {
        if (findNextHorizontaly(lastPlace) === true) {return true;}
        if (findNextVerticaly(lastPlace) === true) {return true;}
        return false;
    }
}

function moveMetro() {
    setTimeout(function() {
        $('div.info-box2').text('Przejazd OK !').css({'backgroundImage': 'url(images/check.png)'});
        $('button', 'div.playButton').text('Zagraj ponownie !').css({'display': 'block'});
        $('div.playButton').on('click','button', function() {
            createBoard();
            createMenu();
            createPlaces();
            onEscKey();
            onClicks();
            route = [];
            routeFixed = [];
            lastPosition = false;
        });
    },2000);
    $('div.playButton').off();
}

function fixRoute() {
    lastPosition = lastPosition || positionStart;
    if (findNextTrack(lastPosition) === true) {
        routeFixed.push(lastPosition);
        lastPosition = newPosition;
        var indexOfItem = route.indexOf(newPosition);
        delete route[indexOfItem];
        fixRoute();
    } else {
        if ($('td', $game).eq(lastPosition).hasClass('end')) {
            console.log(routeFixed);
            setTimeout(function() {
                $('div.info-box1').text('Trasa OK !').css({'backgroundImage': 'url(images/check.png)'});
                $('div.info-box2').css({'display':'flex'});
                moveMetro();
            },1000);
        } else {
            console.log(routeFixed);
            setTimeout(function() {
                $('div.info-box1').text('Błąd').css({'backgroundImage': 'url(images/no.png)'});
                $('button', 'div.playButton').text('Popraw trasę i spróbuj ponownie').css({'display':'block'});
                onClicks();
            },1000);
        }
    }
}

/* game starts here */

createBoard();
$('div.playButton').on('click','button', function() {
    $(this).text('Rozpocznij przejazd !');
    $menu.css({'visibility': 'visible'});
    createMenu();
    createPlaces();
    onEscKey();
    onClicks();
});