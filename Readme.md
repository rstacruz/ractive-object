# ractive-object

Models implemented via Ractive.

Ractive allows you to have objects with dynamic, observable properties and fire 
events. If you strip away the templating/DOM system, Ractive then becomes a 
model library. ractive-model is a wrapper around Ractive that does exactly that.

```js
// the ractive way:
u = new Ractive({ data: { first: "Theone", last: "Greyjoy" }});

// the ractive-model way:
u = RObject.create({ first: "Theone", last: "Greyjoy" });

u.get('first') => "Theone"
u.get('last')  => "Greyjoy"
```

## Use Ractive features

Models are merely Ractive objects, so they support everything Ractive can,
except templates.

 - Computed properties
 - Events

```js
User = RObject.extend({
  computed: {
    full: function () {
      return [ this.get('first'), this.get('last') ].join(' ');
    }
  }
});

u = User.new({ first: "Jon", last: "Snow" });
u.set('last', 'Stewart')

u.get('first') => "Jon"
u.get('last')  => "Stewart"
u.get('full')  => "Jon Stewart"
```

