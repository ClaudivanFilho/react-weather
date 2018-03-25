import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import { App } from './index';
import { fetchRequestMock } from '../../../__mocks__/requestMock' 

const defaultProps = {
  currentWeather: {
    weather: null,
    loading: false
  }
}

configure({ adapter: new Adapter() });

test('Test App Component', () => {
  const component = shallow(<App {...defaultProps} />);
  expect(component.state()).toEqual({
    view: 'CURRENT_WEATHER',
    position: { lat: -34.397, lng: 150.644 },
    zoom: 7
  });

  expect(toJson(component)).toMatchSnapshot();
});

test('Test App Fetch Weather Function', () => {
  const component = shallow(
    <App {...defaultProps} fetchCurrentWeather={fetchRequestMock} fetchForecast={fetchRequestMock}/>
  );
  component.instance().fetchWeather(20, -40);
  expect(component.state().position).toEqual({
    lat: 20, lng: -40
  });
})
