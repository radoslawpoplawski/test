$(document).ready(function () {
    $("form").on('submit', function (event) {
        event.preventDefault();
        var options = {
            "async": true,
            "crossDomain": true,
            "url": "http://api.openweathermap.org/data/2.5/weather?q="+$('#city').val()+"&units=metric&APPID=950b6c460cea43799e2dcaec91465e73",
            "method": "GET"
        };

        $.ajax(options)
            .done(function (result) {
                console.log(JSON.stringify(result));
                showResponse(result);
            })
            .fail(function (error) {
                console.error(error);
            });

        function showResponse(object) {
            if (object.cod === '404') {
                $('#info').append($('<div>').text('Miasto nie znalezione')).append($('<br>'));
            } else {
                $('#info').append($('<div>').text('Miasto: ' + object.name))
                    .append($('<div>').text('Id: ' + object.id))
                        .append($('<div>').text('N: ' + object.coord.lat + ', E:' + object.coord.lon))
                            .append($('<div>').text('Temp: ' + object.main.temp + '^C'))
                                .append($('<br>'));
            }
        }
    });
});
