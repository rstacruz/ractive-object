/* jshint expr: true */

var expect = require('chai').expect;

var RModel, Ractive, User, Sub, name;

describe('RModel', function () {
  before(function () {
    RModel = require('../index');
    Ractive = require('ractive');
  });

  it('exports', function () {
    expect(RModel).be.a('function');
  });

  it('works with instanceof', function () {
    expect(new RModel()).instanceOf(RModel);
  });

  it('works', function () {
    name = RModel.create({ first: 'JS', last: 'Bach' });
    expect(name).instanceOf(RModel);

    expect(name.get('first')).eql('JS');
  });

  it('is extendable', function () {
    User = RModel.extend();
    name = User.create({ first: 'JS', last: 'Bach' });

    expect(name.get('first')).eql('JS');
  });

  it('has ractives static stuff', function () {
    User = RModel.extend();
    var keys = Object.keys(User);
    var original = Object.keys(Ractive.extend());

    original.forEach(function (key) {
      expect(key in User).be.true;
    });
  });

  it('supports computed props', function () {
    User = RModel.extend({
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
    User = RModel.extend({ woop: true });
    name = User.create();

    expect(name.woop).eql(true);
  });
});
