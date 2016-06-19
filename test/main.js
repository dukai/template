requirejs.config({
	baseUrl: '/test',
  paths: {
    text: './lib/text/text',
    dtools: './lib/dtools/tools-1.0.1.min',
    resolver: '../resolver',
    template: '../template'
  }
});

require(['resolver', 'template'], function(load, T){
	load('view/index.tp').then(() => {
		var t = new T(require('text!view/index.tp'));
		t.setHelper('include', function(path, data){
			return new T(require('text!' + path)).render(data);
		});

    var tc = t.render({
      list: [
        {name: 'dk', date: '2016-6-20'},
        {name: 'ds', date: '2016-6-20'},
        {name: 'dx', date: '2016-6-20'}
      ]
    });

    console.log(tc);

	});
});
