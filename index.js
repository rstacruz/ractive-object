;(function (root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(['ractive'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('ractive'));
  } else {
    root.Rmodel = factory(root.Ractive);
  }

}(this, function (Ractive) {

  var Parent = Ractive.extend();

  /*
   * RModel
   */

  function Rmodel (data) {
    Parent.call(this, { data: data });
  }

  Rmodel.prototype = objectCreate(Parent.prototype);
  console.log(Parent.prototype);

  // Inherit registries like adaptors and so on
  each(Parent, function (val, key) {
    Rmodel[key] = {};
  });

  /*
   * Extends model
   */

  Rmodel.extend = function (props) {
    var parent = this;

    function subclass (data) {
      parent.apply(this, arguments);
    }

    subclass.prototype = objectCreate(parent.prototype);
    subclass.prototype.constructor = parent;

    // propagate static methods
    each(parent, function (val, key) {
      subclass[key] = val;
    });

    // propagate instance methods
    each(props, function (val, key) {
      subclass.prototype[key] = val;
    });

    return subclass;
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

  /*
   * Object.create() polyfill
   */

  function objectCreate (proto) {
    var surrogate = function () {};
    surrogate.prototype = proto;
    return new surrogate();
  }

}));
