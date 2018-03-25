import { CURRENT_WEATHER_ARGS_SCHEMA } from './schemas';

export function getOpenWeatherQuery(args, mainField, fields) {
  let queryArgs = '';
  let count = 0;
  for (let key in args) {
    var queryArg = getQueryArg(key, args[key], CURRENT_WEATHER_ARGS_SCHEMA);
    if (queryArgs && queryArg) {
      queryArgs += ', '
    }
    queryArgs += queryArg;
  }
  queryArgs += ', units: "metric"'
  return `{ 
    ${mainField}(${queryArgs}) { 
      ${fields}
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

