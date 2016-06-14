'use strict';
var places = [
    {
        name: 'A',
        siblings: ['B','C']
    },
    {
        name: 'B',
        siblings: ['A','D']
    },
    {
        name: 'C',
        siblings: ['A']
    },
    {
        name: 'D',
        siblings: ['B']
    }
];
var route = [];
var start = places[0];
var end = places[3];
var foundEnd = false;
var point;
var object = {};
object.name = 'A';
object.moves = ['A'];

while (foundEnd === false) {
    point = point || start;
    point.siblings.forEach(function(sibling) {
        object.name = sibling;
        object.moves.push(sibling);
        route.push(object);
    })

}