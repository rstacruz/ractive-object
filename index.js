;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['ractive'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ractive'));
  } else {
    root.Rmodel = factory(root.Ractive);
  }

}(this, function (Ractive) {

  var Rmodel = Ractive.extend({
    // monkeyfix to mutate `options` into `options.data`
    beforeInit: function (options) {
      if (options) {
        var data = {};
        each(options, function (val, key) {
          data[key] = val;
          delete options[key];
        });
        options.data = data;
      }
    }
  });

  return Rmodel;

  /*
   * forEach polyfill
   */

  function each (obj, fn) {
    if (!obj) return;
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) fn(obj[key], key);
    }
  }

}));
