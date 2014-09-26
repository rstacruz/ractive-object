;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['ractive'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ractive'));
  } else {
    root.RObject = factory(root.Ractive);
  }

}(this, function (Ractive) {

  var RObject = Ractive.extend();

  RObject.create = function (data) {
    return new this({ data: data });
  };

  RObject.extend = function () {
    var parent = this.__parent || Ractive;
    var result = parent.extend.apply(this, arguments);
    result.create = RObject.create;
    return result;
  };

  return RObject;

}));
