# ractive-model

Models implemented via Ractive.

Ractive allows you to have objects with dynamic, observable properties and fire 
events. If you strip away the templating/DOM system, Ractive then becomes a 
model library. ractive-model is a wrapper around Ractive that does exactly that.

```js
// the ractive way:
u = new Ractive({ data: { first: "Theone", last: "Greyjoy" }});

// the ractive-model way:
u = new RModel({ first: "Theone", last: "Greyjoy" });

u.get('first') => "Theone"
u.get('last')  => "Greyjoy"
```

## Use Ractive features

Models are merely Ractive objects, so they support everything Ractive can,
except templates.

 - Computed properties
 - Events

```js
User = RModel.extend({
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

## Extensions

ractive-model supports extensions, some of which are bundled in.

 - Persistence (`.save()` and such)
 - Case normalization (eg, `firstName` vs `first_name`)
 - Collections
 - Validation
 - Caching

```js
User = RModel.extend({ ... });
User.include(RModel.extensions.validation);
User.include(RModel.extensions.persistence);

/* or */

User = RModel.extend({
  include: ['validation', 'persistence']
});
```

## Collections

```js
Users = RModel.Collection.extend({
  model: User
});

admins = new Users();

admins.push(user);
admins.at(0);
```

Use them in templates:

```js
UserView = Ractive.extend({
  template:
    "{{#users}}" +
    "  {{#items}}" +
    "     <li>{{first}} {{last}}</li>" +
    "  {{/items}}" +
    "{{/users}}"
});

view = new UserView();
view.set('users', admins);
```

## Extensions

