import { CURRENT_WEATHER_ARGS_SCHEMA } from './schemas';

export function getOpenWeatherQuery(args, mainField, attrs) {
  let argsQuery = '';
  let count = 0;
  for (let key in args) {
    var queryArg = getQueryArg(key, args[key], CURRENT_WEATHER_ARGS_SCHEMA);
    if (argsQuery && queryArg) {
      argsQuery += ', '
    }
    argsQuery += queryArg;
  }
  argsQuery += ', units: "metric"'
  return `{ 
    ${mainField}(${argsQuery}) { 
      ${attrs}
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

