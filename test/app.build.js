({
  baseUrl: './',
  mainConfigFile: './main.js',
  name: 'main',
  out: "./main.build.js",
  paths: {
    dtools: 'empty:',
    template: 'empty:',
    resolver: '../resolver'
  },
  include: [
    'text!view/index.tp',
    'text!view/item.tp'
  ]
})
