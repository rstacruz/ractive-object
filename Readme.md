# ractive-object

Models implemented via Ractive.

Ractive allows you to have objects with dynamic, observable properties and fire 
events. If you strip away the templating/DOM system, Ractive then becomes a 
model library. ractive-object is a wrapper around Ractive that does exactly 
that.

<br>

## API

`RObject` is simply a subclass of *Ractive*. They support everything Ractive can
(eg: events, observers, computed properties) except templates.

```js
User = RObject.extend({
  computed: {
    full: function () {
      return this.get('first') + " " + this.get('last');
    }
  }
});
```

<br>

#### Instanciating
For convenience, it implements `RObject.create(data)` as a way to make an
instance with *data* as the data.

```js
u = User.create({ first: "Jon", last: "Snow" });

u.get('first') => "Jon"
u.get('last')  => "Snow"

u.set({ first: 'Ned', last: 'Stark' }
u.get('full')  => "Ned Stark"
```

<br>

#### Singletons
There's no need to subclass `RObject`.

```js
App.settings = RObject.create({
  units: 'metric',
  temperature: 'F',
  fullscreen: true
});
```

<br>

#### Use it with [ractive-ractive]
With the ractive adaptor, you can better seperate your application logic.

```js
var api = 

// model
Weather = RObject.extend({
  api: "http://api.openweathermap.org/data/2.5/weather?q=%{city}",

  fetch: function () {
    var url = this.api.replace('%{city}', this.get('city'));
    return $.ajax(url).then(this.set);
  }
});

// view
WeatherView = Ractive.extend({
  data: {
    weather: Weather.create({ city: "London,uk" })
    settings: App.settings
  }
});
```

[ractive-ractive]: https://github.com/rstacruz/ractive-ractive
