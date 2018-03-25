import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import { CityInput } from './index';
import { setTimeout } from 'timers';
import { fetchRequestMock } from '../../../__mocks__/requestMock' 

configure({ adapter: new Adapter() });

test('Test CityInput Component - simulate onChange input event', (done) => {
  const component = shallow(<CityInput fetchCurrentWeather={fetchRequestMock} fetchForecast={fetchRequestMock}/>);
  expect(component.find('input').props().value).toEqual(undefined);
  component.find('input').simulate('change', {target: {value: 'Campina Grande'}, persist: () => {}});
  // It's necessary because of debounce funcion presents in the input onChange handle
  setTimeout(() => {
    done();
  }, 2000)
});

test('Test CityInput Snapshot', () => {
  const component = renderer.create(
    <CityInput />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})