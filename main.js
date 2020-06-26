(function ($) {
    // console.log('ok');
    
    $(function () {
        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $main = $('#main'),
            $main_articles = $main.children('article');

        $body.addClass('is-loading');
        console.log("add");
        

        $window.on('load', function () {
            window.setTimeout(function () {
                console.log("remove");
                
                $body.removeClass('is-loading')
            }, 100)
        })
    })
})(jQuery)