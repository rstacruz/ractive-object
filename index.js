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

  /*
   * instanciate
   */

  RObject.create = function (data) {
    return new this({ data: data });
  };

  /*
   * Reimplements `.extend()` to carry over `.create`.
   */

  RObject.extend = function () {
    // start with Ractive.extend()'s result
    var parent = this._parent && this._parent.value;
    var result = (parent || Ractive).extend.apply(this, arguments);

    // add in more stuff
    result.create = (parent || RObject).create;
    result.extend = (parent || RObject).extend;

    return result;
  };

  return RObject;

}));
