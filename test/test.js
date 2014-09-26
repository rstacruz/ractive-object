/* jshint expr: true */

var expect = require('chai').expect;

var RObject, Ractive, User, Sub, name;

before(function () {
  RObject = require('../index');
  Ractive = require('ractive');
});

describe('RObject', function () {
  it('exports', function () {
    expect(RObject).be.a('function');
  });

  it('works with instanceof', function () {
    expect(new RObject()).instanceOf(RObject);
  });

  it('works', function () {
    name = RObject.create({ first: 'JS', last: 'Bach' });
    expect(name).instanceOf(RObject);

    expect(name.get('first')).eql('JS');
  });

  it('is extendable', function () {
    User = RObject.extend();
    name = User.create({ first: 'JS', last: 'Bach' });

    expect(name.get('first')).eql('JS');
  });

  it('has ractives static stuff', function () {
    User = RObject.extend();
    var keys = Object.keys(User);
    var original = Object.keys(Ractive.extend());

    original.forEach(function (key) {
      expect(key in User).be.true;
    });
  });

  it('supports computed props', function () {
    User = RObject.extend({
      computed: {
        full: function () {
          return this.get('first') + ' ' + this.get('last');
        }
      }
    });

    name = User.create({ first: 'JS', last: 'Bach' });
    expect(name.get('full')).eql('JS Bach');
  });

  it('carries prototype in extensions', function () {
    User = RObject.extend({ woop: true });
    name = User.create();

    expect(name.woop).eql(true);
  });

  it('disables template-related functions', function () {
    expect(RObject.create().find).be.undefined;
  });

  it('disables templates', function () {
    expect(function () {
      new RObject({ template: 'x' });
    }).to.throw;
  });
});

describe('Robject with nested cases', function () {
  var A, B, C;

  beforeEach(function () {
    A = RObject.extend();
    B = A.extend();
    C = B.extend();
  });

  it('supports extend all the way', function () {
    expect(B.create).be.a('function');
    expect(C.create).be.a('function');
  });

  it('accounts for instanceOf', function () {
    expect(B.create()).instanceOf(A);
    expect(C.create()).instanceOf(A);
  });
});
