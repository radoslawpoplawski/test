'use strict';
var places = [
    {
        id: 0,
        name: 'A',
        siblings: [1,2]
    },
    {
        id: 1,
        name: 'B',
        siblings: [0,3]
    },
    {
        id: 2,
        name: 'C',
        siblings: [0]
    },
    {
        id: 3,
        name: 'D',
        siblings: [1,4]
    },
    {
        id: 4,
        name: 'E',
        siblings: [3]
    }
];
var i = 0;
var route = [{id: 0, moves: [0]}];
var end = places[4];
var foundEnd = false;

while (foundEnd === false) {
    var idPoint = route[i].id;
    places[idPoint].siblings.forEach(function(sibling) {
        if (route[i].moves.some(function(item) {return sibling === item}) === false) {
            var object = {};
            object.id = sibling;
            object.moves = route[i].moves.slice();
            object.moves.push(sibling);
            route.push(object);
            console.log(JSON.stringify(route));
            if (object.id === end.id) {foundEnd = true;}
        }
    });

    i++;
}
console.log(route[route.length-1].moves);