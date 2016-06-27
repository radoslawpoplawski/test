'use strict';
(function(){
    console.info('Witam na moim internetowym CV :)');
    var items = ['contact','projects','interests','skills','experience','education'];

    $('.clickable').on('click', function(){
        if ($('i', this).attr('class') !== $('i', '#description').attr('class')) {
            var index = items.indexOf($(this).attr('id'));
            var rotateCircle1 = (index * 60) + 30;
            var $circle = $('.circle1');
            $circle.css({'transform': 'rotate(' + rotateCircle1 + 'deg)'});
            $circle.css({'left': '-300px'});
            antiRotate($circle.children());
            showDes($(this));
        }
        function antiRotate(item) {
            item.css({'transform': 'rotate(-' + rotateCircle1 + 'deg)'});
        }
    });
    $('.row').on('click', function(){
        if ($('i', this).hasClass('fa-chevron-down')) {
            $(this).siblings().css({'height': '50px'}).find('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
            $(this).css({'height': 'auto'});
            $('i', this).removeClass('fa-chevron-down').addClass('fa-chevron-up');
            var link = /[a-z]*/.exec($(this).attr('id'));
            $('.insert', this).load("templates/"+link[0]+".html");
        } else {
            $(this).css({'height': '50px'});
            $('i', this).removeClass('fa-chevron-up').addClass('fa-chevron-down');
        }
    });

    function showDes(item){
        var $text = $('#text');
        setTimeout(function(){
            $text.children().remove();
            $text.load("templates/"+item.attr('id')+".html");
        },3000);
    }
}());