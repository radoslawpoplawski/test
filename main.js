'use strict';

$('form').on('submit', function(event) {
    event.preventDefault();
});
$('#app').append($('<p>'));
$('form').on('change', function() {
    $('p').text($('#value-field').val());
});
$('form').on('reset', function() {
    $('p').text('');
});