(function ($) {
    // console.log('ok');

    $(function () {
        var $window = $(window),
            $body = $('body'),
            $wrapper = $('#wrapper'),
            $header = $('#header'),
            $main = $('#main'),
            $footer = $('#footer'),
            $main_articles = $main.children('article'),
            $continue = $('#continue');

        $body.addClass('is-loading');

        // console.log($main_articles)



        $window.on('load', function () {
            window.setTimeout(function () {

                $body.removeClass('is-loading')
            }, 100)
        })

        var delay = 325,
            locked = false;

        $main._show = function (id, initial) {
            // 通过id确认 哪一个article
            var $article = $main_articles.filter('#' + id);
            // console.log($article);

            // no article return
            if ($article.length == 0) return;

            if (locked || (typeof initial != 'undefined' && initial === true)) {
                // 这个先加上之后测试

                // 标记可见
                $body.addClass('is-article-visible');

                // 停止所有文字 防止万一激活
                $main_articles.removeClass('active');

                // 隐藏 header，footer,continue
                $header.hide();
                $footer.hide();
                $continue.hide();

                // 显示 main  article
                $main.show();
                $article.show();

                // 激活文章 article
                $article.addClass('active');

                // 锁定
                locked = false;

                return;
            }

            locked = true;
            $body.addClass('is-article-visible');
            setTimeout(function () {
                // 隐藏 header，footer,continue
                $header.hide();
                $footer.hide();
                $continue.hide();

                // 显示 main  article
                $main.show();
                $article.show();

                setTimeout(function () {
                    $article.addClass('active');

                    setTimeout(function () {
                        locked = false;
                    }, 25);
                }, delay);

            }, delay);

        }

        // 隐藏
        $main._hide = function (addState) {
            var $article = $main_articles.filter('.active');

            if (!$body.hasClass('is-article-visible')) return;

            // 添加状态
            // pushState 浏览器不会向服务端请求数据，直接改变url地址
            if (typeof addState != 'undefined' && addState === true) history.pushState(null, null, '#');

            if (locked) {


                // 隐藏掉 文章
                $article.removeClass('active');

                // 隐藏 article main
                $article.hide();
                $main.hide();


                // 显示fotter header
                $footer.show();
                $header.show();

                $body.removeClass('is-article-visible');

                return;
            }

            // lock
            locked = true;

            $article.removeClass('active');

            setTimeout(() => {
                // 隐藏 article main
                $article.hide();
                $main.hide();


                // 显示fotter header
                $footer.show();
                $header.show();

                setTimeout(function () {
                    $body.removeClass('is-article-visible');
                    setTimeout(function () {
                        locked = false;
                    }, delay);
                }, 25);
            }, delay);

        };

        $main_articles.each(function () {
            var $this = $(this);

            // close
            $('<div class="close">Close</div>').appendTo($this).on('click', function () {
                location.hash = '';
            })
        });


        $body.on('click', function (event) {

            // Article visible? Hide.
            if ($body.hasClass('is-article-visible'))
                $main._hide(true);

        });

        $window.on('hashchange', function (event) {

            if (location.hash == '' || location.hash == '#') {
                event.preventDefault();
                event.stopPropagation();

                $main._hide();

            } else if ($main_articles.filter(location.hash).length > 0) {
                event.preventDefault();
                event.stopPropagation();

                console.log(location.hash.substr(1));

                $main._show(location.hash.substr(1));
            }
        });

        $window.on('keyup', function () {
            switch (event.keyCode) {
                case 27:
                    if ($body.hasClass('is-article-visible')) {
                        $main._hide(true);
                    }
                    break;
                default:
                    break;
            }

        })

        // Hide main, articles.
        $main.hide();
        $main_articles.hide();

        // Initial article.
        if (location.hash != '' &&
            location.hash != '#')
            $window.on('load', function () {
                $main._show(location.hash.substr(1), true);
            });

    })
})(jQuery)