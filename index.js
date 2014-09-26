;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['ractive'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ractive'));
  } else {
    root.Rmodel = factory(root.Ractive);
  }

}(this, function (Ractive) {

  var Rmodel = Ractive.extend();

  Rmodel.create = function (data) {
    return new this({ data: data });
  };

  Rmodel.extend = function () {
    var parent = this.__parent || Ractive;
    var result = parent.extend.apply(this, arguments);
    result.create = Rmodel.create;
    return result;
  };

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
