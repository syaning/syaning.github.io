$(function() {
    var tpls = {
        header: $('#tpl-header')
            .html(),
        menu: $('#tpl-menu')
            .html(),
        doc: $('#tpl-doc')
            .html()
    };

    var eles = {
        header: $('header'),
        nav: $('nav'),
        main: $('main')
    };

    var flags = {
        header: false,
        nav: false
    };

    $.ajaxSetup({
        cache: false
    });

    $.get('dawn.json')
        .done(function(data) {
            data.docs.reverse();
            initRouter(data);
            renderPage(data);
        })
        .fail(err404);

    function initRouter(data) {
        var routes = {
            '/': function() {
                renderPage(data);
            },
            '/page/:title': function(title) {
                renderPage(data, 'pages/' + title + '.md');
            },
            '/doc/:date/:title': function(date, title) {
                renderPage(data, 'docs/' + date + '-' + title + '.md');
            }
        };
        Router(routes)
            .configure({
                notfound: err404
            })
            .init();
    }

    function renderPage(data, src) {
        if (!flags.header) {
            eles.header.html(Mustache.render(tpls.header, {
                title: data.title,
                subtitle: data.subtitle
            }));
            flags.header = true;
        }

        if (!flags.nav) {
            eles.nav.html(data.menus.map(function(m) {
                    return Mustache.render(tpls.menu, {
                        title: m.title,
                        href: m.link || '/#/page/' + m.src
                    });
                })
                .join(''));
            flags.nav = true;
        }

        if (src) {
            $.get(src)
                .done(function(result) {
                    eles.main.html(kramed(result));
                })
                .fail(err404);
        } else {
            eles.main.html(data.docs.map(function(d) {
                return Mustache.render(tpls.doc, d);
            }));
        }
    }

    function err404() {
        $.get('assets/tpl/404.md')
            .done(function(data) {
                eles.main.html(kramed(data));
            });
    }
});
