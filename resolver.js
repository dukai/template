define(function(require, exports, module){
  "use stict"
  var re = /include\(['"]([\/\d\w\-\.]+)['"].*\)/;
  let normallize = function(path){
    return 'text!' + path;
  }

  let reference = 1;
  var loadFile = function(path){
		path = normallize(path);
    return new Promise((resolve, reject) => {
      require([path], (content) => {
				console.log(path);
        reference--;
        let result = null;
        if((result = re.exec(content)) != null){
          reference++;
          loadFile(result[1]).then(resolve, reject);
        }

        if(reference == 0){
          resolve();
        }
      });
    });
  }

  module.exports = loadFile;

});
