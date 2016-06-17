define(function(require, exports, module){
  "use stict"
  var re = /include\(['"]([\/\d\w\-\.]+)['"]\)/;
  var reference = 1;
  var loadFile = function(path, callback){
    require([path], function(content){
      reference--;
      let result = null;
      if((result = re.exec(content)) != null){
        loadFile(result[1], callback);
        reference++;
      }

      if(reference == 0){
        callback();
      }
    });
  }
  module.exports = function(path){
    loadFile(path, function(){
    });
  };
});
