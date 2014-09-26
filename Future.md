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

