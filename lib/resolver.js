"use strict";

define(function (require, exports, module) {
  "use stict";

  var re = /include\(['"]([\/\d\w\-\.]+)['"].*\)/;
  var normallize = function normallize(path) {
    return 'text!' + path;
  };

  var reference = 1;
  var loadFile = function loadFile(path) {
    path = normallize(path);
    return new Promise(function (resolve, reject) {
      require([path], function (content) {
        console.log(path);
        reference--;
        var result = null;
        if ((result = re.exec(content)) != null) {
          reference++;
          loadFile(result[1]).then(resolve, reject);
        }

        if (reference == 0) {
          resolve();
        }
      });
    });
  };

  module.exports = loadFile;
});