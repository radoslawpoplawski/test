'use strict';
var $player = $('.player-row');
var $player2 = $('.player-row2');
var cards ={
    row3: ['13','14','15','16','17','18'],
    row2: ['7','8','9','10','11','12'],
    row1: ['1','2','3','4','5','6']
};
var propertiesOfCards ={
    1: [1,0,1,0,3,0,2],
    2: [0,2,0,0,2,0,3],
    3: [1,1,0,1,1,0,2],
    4: [0,1,0,2,0,0,2],
    5: [1,1,1,1,1,0,4],
    6: [1,1,1,1,1,0,1],
    7: [5,0,0,3,0,2,3],
    8: [3,2,3,0,0,1,1],
    9: [0,5,0,0,0,2,1],
    10: [2,0,1,0,4,2,3],
    11: [2,0,1,0,4,2,3],
    12: [1,1,1,1,1,1,4],
    13: [3,5,1,1,1,2,2],
    14: [3,5,1,1,1,2,2],
    15: [3,5,1,1,1,2,2],
    16: [3,5,1,1,1,2,2],
    17: [3,5,1,1,1,2,2],
    18: [3,5,1,1,1,2,2]
};
var stones = {
    diamond: ['101','102','103','104'],
    emerald: ['105','106','107','108'],
    ruby: ['109','110','111','112'],
    sapphire: ['113','114','115','116'],
    onyx: ['117','118','119','120'],
    gold: ['121','122','123','124','125']
};

function randomizeCard(numberOfRow) {               // funckja losuje kartę do odpowiedniego rzędu
    var indexOfCard = Math.round(Math.random() * 5);
    var randomCard = cards[numberOfRow][indexOfCard];
    if (randomCard === undefined) {
        return randomizeCard(numberOfRow);
    }
    delete cards[numberOfRow][indexOfCard];
    return randomCard;
}

function generateCards(){                           // funkcja generuje kartę na ekranie
    for (var i=1; i<4; i++) {
        var rowString;
        switch (i){
            case 1: rowString = 'row1'; break;
            case 2: rowString = 'row2'; break;
            case 3: rowString = 'row3'; break;
        }
        $('.'+rowString).append($('<div>').addClass('gamecard backcard'));
        for (var j = 0; j < 4; j++) {
            var randomCard = randomizeCard(rowString);
            $('.'+rowString).append($('<div>').addClass('gamecard frontcard').attr('id',randomCard));

        }
    }
}

function generateStones() {                         // funckja generuje kamienie szlachetne
    for (var typeOfStone in stones) {
        for (var i=0; i < stones[typeOfStone].length; i++) {
            addStone('.row0',stones[typeOfStone][i],typeOfStone);
        }
    }
}
function addStone(numberOfRow,idStone,stoneType){   // funkcja dodaje kamienie do odpowiedniego rzędu
    if ($('div',numberOfRow).hasClass(stoneType)) {
        $('.'+stoneType, numberOfRow).attr('id',$('.'+stoneType, numberOfRow).attr('id')+idStone);
        $('.'+stoneType, numberOfRow).data('value',$('.'+stoneType, numberOfRow).data('value')+1);
        $('.'+stoneType, numberOfRow).text($('.'+stoneType, numberOfRow).data('value'));
    } else {
        $(numberOfRow).append($('<div>').addClass('stone ' + stoneType).data('value',1).attr('id',idStone));
    }
}

function onCLickCard(){
    $('.frontcard').on('click', function () {
        var parentDiv = (/row(\d)/.exec($(this).parent().attr('class')))[0];
        $player.append($('<div>').attr('class',$(this).attr('class')).attr('id', $(this).attr('id')));
        if (cards[parentDiv].some(function (a) {
                return a !== undefined
            }) === true) {
            var randomCard = randomizeCard(parentDiv);
            $(this).attr('id', 'gamecard' + randomCard[0]);
        } else {
            $(this).remove();
        }
        if (cards[parentDiv].some(function (a) {
                return a !== undefined
            }) === false) {
            $('.backcard', '.'+parentDiv).css({'visibility': 'hidden'});
        }
    });
}

function onClickStone() {
    $('.stone').on('click', function () {
        console.log('klik');
        var stoneType = ($(this).attr('class').slice(6));
        var stoneId = ($(this).attr('id').slice(0,3));
        if ($(this).data('value') > 1) {
            $(this).attr('id',$(this).attr('id').slice(3));
            $(this).data('value', $(this).data('value') - 1);
            if ($(this).data('value') === 1) {
                $(this).text('');
            } else {
                $(this).text($(this).data('value'));
            }
        } else {
            $(this).removeClass('stone '+stoneType).attr('id','');
        }
        if ($(this).parent().hasClass('row0')) {
            addStone($player2,stoneId,stoneType);
            $('.stone').off();
            onClickStone();
        } else {
            addStone('.row0',stoneId,stoneType);
            $('.stone').off();
            onClickStone();
        }
    });
}

/*game starts here*/
generateCards();
generateStones();
onCLickCard();
onClickStone();

