## Future features

* Type coercion
* Collections
* Associations

## Type coercion

There needs to be a way to coerce certain attributes to a data type.

```js
Person.extend({
  attributes: {
    birthday: Date
  }
});

frank = Person.create({
  name: "Frank Sinatra",
  birthday: "1915-12-12T08:00Z"
})

frank.get('birthday')    // ...date comes out
```

## Collections

Collections should be implemented at some point.

```js
City = RObject.extend();

tokyo = City.create({ name: 'Tokyo', country: 'Japan' });
london = City.create({ name: 'London', country: 'UK' });
chicago = City.create({ name: 'Chicago', country: 'USA' });
newyork = City.create({ name: 'New York', country: 'USA' });

/*
 * collections:
 */

Cities = RObject.Collection.extend({
  model: City
});

list = Cities.create([ toyko, london, newyork ]);
list = Cities.create([ { name: 'Milan' }, { name: 'Rio' }, ... ]);

/*
 * array manipulation features:
 */

list.select({ country: 'USA' });
list.at(2);
list.length;
list.push({ name: 'St. Petersburg', country: 'Russia' }); // auto-instanciates
list.slice(1);
list.splice(1,2);
list.forEach(function () { ... });
list.map(function () { ... });

/*
 * items under `items`
 */

list.get('items') //=> array

// you got attributes too
list.set('status', 'pending');
list.get('status');
```

This should work with type coercion.

```js
Tour = RObject.extend({
  attributes: {
    cities: Cities
  }
});

Tour = RObject.extend();

eu = Tour.create();
eu.set('cities', [{ name: 'Prague' }, { name: 'Antwerp' }]);
eu.get('cities') //=> [Object Tour]
```

## Associations

Dunno.

```js
/* hah */
```
