;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['ractive'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ractive'));
  } else {
    root.RObject = factory(root.Ractive);
  }

}(this, function (Ractive) {

  /*
   * Subclass RActive with template-related things disabled.
   */

  var RObject = Ractive.extend({
    find: void 0,
    findAll: void 0,
    findComponents: void 0,
    findAllComponents: void 0,
    render: void 0,
    beforeInit: function (options) {
      if (options && options.template)
        throw new Error("RObject: template not allowed");
    }
  });

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
