$(function() {
	var location = window.location,
		header = $('header'),
		nav = $('nav'),
		main = $('main'),
		headertpl = '<h1><a href="/#/">{title}</a></h1><p>{subtitle}</p>',
		doctpl =
		'<p class="doc-item"><span>{date}</span><a href="/#/doc/{src}">{title}</a></p>',
		pagetpl = '<a href="/#/page/{src}">{title}</a>',
		converter = new Showdown.converter();

	Router({
			'/': home,
			'/doc/:title': doc,
			'/page/:title': page
		})
		.configure({
			notfound: err404
		})
		.init();

	if (!location.hash) {
        location.href = location.origin + '/#/';
	}else{
        $.get('dawn.json')
            .done(function(data) {
                header.html(format(headertpl, {
                    title: data.title,
                    subtitle: data.subtitle
                }));
                nav.html(data.pages.map(function(page) {
                    return format(pagetpl, page);
                }).join(''));
            });
    }

	function format(tpl, data) {
		for (var key in data) {
			tpl = tpl.replace(new RegExp('{' + key + '}', 'mgi'),
				data[key]);
		}
		return tpl;
	}

	function home() {
		$.get('dawn.json')
			.done(function(data) {
				header.html(format(headertpl, {
					title: data.title,
					subtitle: data.subtitle
				}));
                nav.html(data.pages.map(function(page) {
                    return format(pagetpl, page);
                }).join(''));
				main.html(data.docs.reverse().map(function(doc) {
					return format(doctpl, doc)
				}).join(''));
			});
	}

	function doc(title) {
		$.get('docs/' + title + '.md')
			.done(function(data) {
				main.html(converter.makeHtml(data));
			})
			.fail(err404);
	}

	function page(title) {
		$.get('pages/' + title + '.md')
			.done(function(data) {
				main.html(converter.makeHtml(data));
			})
			.fail(err404);
	}

	function err404() {
		$.get('assets/tpl/404.md').done(function(data) {
			main.html(converter.makeHtml(data));
		});
	}

});
