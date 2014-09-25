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

  it('is extendable', c(function () {
    User = RModel.extend();
    name = new User({ first: 'JS', last: 'Bach' });

    expect(name.get('first')).eql('JS');
  }));

  it('carries static methods in subclasses', function () {
    User = RModel.extend();
    User.static = 2;

    Sub = User.extend();

    expect(Sub.static).eql(2);
  });

  it('has ractives static stuff', function () {
    User = RModel.extend();
    console.log(Object.keys(User));
    console.log(Object.keys(Ractive.extend()));
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

function c(fn) {
  return function () {
    try {
      fn();
    } catch (e) {
      var cwd = process.cwd() + '/';
      var stack = e.stack.split('\n');

      stack = stack.reduce(function (list, line) {
        if (~line.indexOf('node_modules/mocha'))
          return list;

        line = line.replace(cwd, '');
        list.push(line);
        return list;
      }, []);

      e.stack = stack.join('\n');
      throw e;
    }
  };
}
