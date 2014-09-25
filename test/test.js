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
    name = new RModel({ first: 'JS', last: 'Bach' });
    expect(name).instanceOf(RModel);

    expect(name.get('first')).eql('JS');
  });

  it('is extendable', function () {
    User = RModel.extend();
    name = new User({ first: 'JS', last: 'Bach' });

    expect(name.get('first')).eql('JS');
  });

  it('has ractives static stuff', function () {
    User = RModel.extend();
    var keys = Object.keys(User);
    var original = Object.keys(Ractive.extend());

    expect(original).eql(keys);
  });

  it('supports computed props', function () {
    User = RModel.extend({
      computed: {
        full: function () {
          return this.get('first') + ' ' + this.get('last');
        }
      }
    });

    name = new User({ first: 'JS', last: 'Bach' });
    expect(name.get('full')).eql('JS Bach');
  });

  it('carries prototype in extensions', function () {
    User = RModel.extend({ woop: true });
    name = new User();

    expect(name.woop).eql(true);
  });
});
