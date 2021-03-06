const fetch = require('node-fetch')

const OPEN_WEATHER_API_KEY = "954ae1976b012d88d730dde28ed0afa9";
const OPEN_WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/";

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLFloat,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const DayType = new GraphQLObjectType({
  name: 'DayType',
  description: '...',
  fields: () => ({
    info: { 
      type: GraphQLString,
      resolve: json => json.weather[0].main 
    },
    description: { 
      type: GraphQLString,
      resolve: json => json.weather[0].description 
    },
    icon: {
      type: GraphQLString,
      resolve: json => json.weather[0].icon
    },
    temp: {
      type: GraphQLFloat,
      resolve: json => json.main.temp
    },
    temp_max: {
      type: GraphQLFloat,
      resolve: json => json.main.temp_max
    },
    temp_min: {
      type: GraphQLFloat,
      resolve: json => json.main.temp_min
    },
    date: {
      type: GraphQLString,
      resolve: json => json.dt
    }
  })
});

const ForecastType = new GraphQLObjectType({
  name: 'Forecast',
  description: '...',
  fields: () => ({
    lat: { 
      type: GraphQLFloat,
      resolve: json => json.city.coord.lat 
    },
    lon: { 
      type: GraphQLFloat,
      resolve: json => json.city.coord.lon
    },
    name: {
      type: GraphQLString,
      resolve: json => json.city.name
    },
    country: {
      type: GraphQLString,
      resolve: json => json.city.country
    },
    list: {
      type: GraphQLList(DayType)
    }
  })
});

const WeatherType = new GraphQLObjectType({
  name: 'Weather',
  description: '...',
  fields: () => ({
    lat: { 
      type: GraphQLFloat,
      resolve: json => json.coord.lat 
    },
    lon: { 
      type: GraphQLFloat,
      resolve: json => json.coord.lon
    },
    name: {
      type: GraphQLString
    },
    country: {
      type: GraphQLString,
      resolve: json => json.sys.country
    },
    temp: {
      type: GraphQLFloat,
      resolve: json => json.main.temp 
    },
    temp_min: {
      type: GraphQLFloat,
      resolve: json => json.main.temp_min 
    },
    temp_max: {
      type: GraphQLFloat,
      resolve: json => json.main.temp_max
    },
    main: {
      type: GraphQLString,
      resolve: json => json.weather[0].main
    },
    description: {
      type: GraphQLString,
      resolve: json => json.weather[0].description
    },
    humidity: {
      type: GraphQLInt,
      resolve: json => json.main.humidity
    },
    sunrise: {
      type: GraphQLString,
      resolve: json => json.sys.sunrise
    },
    sunset: {
      type: GraphQLString,
      resolve: json => json.sys.sunset
    },
    pressure: {
      type: GraphQLInt,
      resolve: json => json.main.pressure
    },
    icon: {
      type: GraphQLString,
      resolve: json => json.weather[0].icon
    },
    clouds: {
      type: GraphQLFloat,
      resolve: json => json.clouds.all
    },
    wind: {
      type: GraphQLFloat,
      resolve: json => json.wind.speed
    }
  })
})

function getWeatherUrl(args, mainField) {
  var url = OPEN_WEATHER_API_URL + `${mainField}?`;
  for (key in args) {
    var keyName = (key == 'city' ? 'q' : key);
    url +=  `${keyName}=${args[key]}&`
  }
  url += `appid=${OPEN_WEATHER_API_KEY}`;
  console.log(url);
  return url
}

function resolve(root, args, mainField) {
  return fetch(getWeatherUrl(args, mainField)).then(response => response.text())
  .then((response) => {
    let json = JSON.parse(response);
    // console.log(response)
    if (json.cod != 200) {
      throw new Error(json.message);
    }
    return json
  }, (err) => {
    console.log(err)
    throw new Error('Error on request.');
  })
}

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: () => ({
      weather: {
        type: WeatherType,
        args: {
          city: { type: GraphQLString },
          units: { type: GraphQLString },
          lat: { type: GraphQLFloat },
          lon: { type: GraphQLFloat }
        },
        resolve: (root, args) => resolve(root, args, 'weather') 
      },
      forecast: {
        type: ForecastType,
        args: {
          city: { type: GraphQLString },
          units: { type: GraphQLString },
          lat: { type: GraphQLFloat },
          lon: { type: GraphQLFloat }
        },
        resolve: (root, args) => resolve(root, args, 'forecast')
      }
      
    })
  })
})