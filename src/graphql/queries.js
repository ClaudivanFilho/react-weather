import { CURRENT_WEATHER_ARGS_SCHEMA } from './schemas';

export function getCurrentWeatherQuery(args) {
  let result = '';
  let count = 0;
  for (let key in args) {
    var queryArg = getQueryArg(key, args[key], CURRENT_WEATHER_ARGS_SCHEMA);
    if (result && queryArg) {
      result += ', '
    }
    result += queryArg;
  }
  return `{ 
    weather(${result}) { 
      lat, lon, temp, temp_min, temp_max, main, description, name, country, sunrise, sunset, humidity, icon, rain, wind
    } 
  }`
}

function getQueryArg(field, value, schema) {
  if (!value) return '';

  if (schema[field] == String) {
    return `${field}: "${value}"`;
  } 
  return `${field}: ${value}`;
}

