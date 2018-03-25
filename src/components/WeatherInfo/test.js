import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import { WeatherInfo } from './index';

configure({ adapter: new Adapter() });

const currentWeatherMock = {
  weather: { 
    main: 'Clouds', 
    description: 'many clouds', 
    wind: 1, 
    temp: 30, 
    temp_min: 29,
    temp_max: 31,
    sunset: '123123123', 
    sunrise: '123123123',
    icon: '10n'
  }
}

test('Test WeatherInfo Component', () => {
  const component = shallow(<WeatherInfo currentWeather={currentWeatherMock}/>);
  expect(component.find('strong').length).toEqual(5);
  expect(component.find('img').length).toEqual(1);
  expect(component.find('CardImage').length).toEqual(3);
  expect(toJson(component)).toMatchSnapshot();
});