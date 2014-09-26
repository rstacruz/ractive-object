# ractive-object

Models implemented via Ractive.

Ractive allows you to have objects with dynamic, observable properties and fire 
events. If you strip away the templating/DOM system, Ractive then becomes a 
model library. ractive-object is a wrapper around Ractive that does exactly 
that.

<br>

## API

`RObject` is simply a subclass of *Ractive*. That means it supports everything
Ractive does (eg: events, observers, computed properties).

```js
User = RObject.extend({
  computed: {
    full: function () {
      return this.get('first') + " " + this.get('last');
    }
  }
});
```

Ractive supports:

* Properties ([.get()], [.set()])
* Events ([.on()], [.off()], [.fire()])
* Property observing ([.observe()])
* [Computed properties](http://docs.ractivejs.org/latest/computed-properties)

[.on()]: http://docs.ractivejs.org/latest/ractive-on
[.off()]: http://docs.ractivejs.org/latest/ractive-off
[.get()]: http://docs.ractivejs.org/latest/ractive-get
[.set()]: http://docs.ractivejs.org/latest/ractive-set
[.fire()]: http://docs.ractivejs.org/latest/ractive-fire
[.observe()]: http://docs.ractivejs.org/latest/ractive-observe

<br>

### Instanciating
For convenience, it implements `RObject.create(data)` as a way to make an
instance with `data` as the data.

```js
u = User.create({ first: "Jon", last: "Snow" });

u.get('first') => "Jon"
u.get('last')  => "Snow"

u.set({ first: 'Ned', last: 'Stark' });
u.get('full')  => "Ned Stark"
```

<br>

### Singletons
There's no need to subclass `RObject`.

```js
App.settings = RObject.create({
  units: 'metric',
  temperature: 'F',
  fullscreen: true
});
```

<br>

### Use it with [ractive-ractive]
With the ractive adaptor, you can better seperate your application logic.

```js
/*
 * Model
 */

Weather = RObject.extend({
  api: "http://api.openweathermap.org/data/2.5/weather?q=%{city}",

  fetch: function () {
    var url = this.api.replace('%{city}', this.get('city'));
    return $.ajax(url).then(this.set);
  }
});

/*
 * View
 */

WeatherView = Ractive.extend({
  template: /*...*/,
  data: {
    weather: Weather.create({ city: "London,uk" })
    settings: App.settings
  }
});
```

[ractive-ractive]: https://github.com/rstacruz/ractive-ractive

<br>

## So it's just sugar?
Yes: RObject is simply syntactic sugar over Ractive to allow you to use
`RObject.create({ name: 'Kay' })` instead of `new Ractive({ data: { name: 'Kay'
}})`.

Apart from this convenience, it allows for more readable code by making a
differenciation between data classes (`RObject.extend`) and view classes
(`Ractive.extend`).

<br>

## To do

- Collections support is planned to be implemented at some point. This would
make it a full-fledged model system.

- Once Ractive supports mixins, this would be a great way to offer mixins for
validation, persistence, AJAX, and other things you'd expect from a model library.
